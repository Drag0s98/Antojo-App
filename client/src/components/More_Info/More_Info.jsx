import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { DataContext } from '../../context/context';

import Footer from '../Footer';
import swal from 'sweetalert';


import { MapContainer, TileLayer, Marker, Popup, MapConsumer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

function More_Info({ location }) {
  const history = useHistory();
  console.log("Location state: " + location.state);

  const { orders, setOrders } = useContext(DataContext);

  const objDish = {
    name: location.state.dish.name,
    category: location.state.dish.category,
    restaurant: location.state.restaurant,
    price: location.state.dish.price,
  };

  const objRestaurant = {
    name: location.state.restaurant.name,
    address: location.state.restaurant.address,
    coordinates: location.state.restaurant.coordinates
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/more/${location.state.restaurant}`)
      .then((res) => {
        console.log(res.data);
        let objRestaurant = res.data[0];
        setOrders([objRestaurant, objDish]); //Le meto toda la informacion de ese restaurante y del plato
      });
  }, [location]);

  const coordinates = [40.42166, -3.69271] // Coger coordenadas del restaurante

  return (
    <section className="moreInfo">
      <header className="header-general">
        <button onClick={() => history.push('/home')}>«--</button>
        <h3>Nombre del plato</h3>
      </header>
      <div className="tgview">
        <h2>Plato:</h2>  <h4 className="tituloview">{location.state.dish.name}</h4>
        Categoría: <p>{location.state.dish.category}</p>
        Restaurante: <h3>{location.state.restaurant}</h3>
        Precio: <p>{location.state.dish.price}</p>
        <button onClick={() => {
          swal({
            title: '¡Su plato ha sido añadido a pedidos!',
            text: '¿Deseas pagar ya el plato?',
            buttons: true,
            className: 'popUp'
          })
          .then(async(value) => {
            if(value){
              await new Promise(resolve => setTimeout(resolve, 200))
              history.push('/address')
            }else{
              swal.close();
            }
          })
          
        }} >
          Pedir plato
        </button>
        <Footer />
      </div>
    </section>
  );
}

export default More_Info;
