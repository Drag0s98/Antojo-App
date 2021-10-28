import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { DataContext } from "../../context/context";

import Footer from "../Footer";
import swal from "sweetalert";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  MapConsumer,
} from "react-leaflet";
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
    coordinates: location.state.restaurant.coordinates,
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/more/${location.state.restaurant}`)
      .then((res) => {
        console.log(res.data);
        let objRestaurant = res.data[0];
        setOrders([objRestaurant, objDish]); //Le meto toda la informacion de ese restaurante y del plato
      });
  }, [location]);

  const coordinates = [40.42166, -3.69271]; // Coger coordenadas del restaurante

  return (
    <section className="moreInfo">
      <header className="header-general">
        <button onClick={() => history.push("/home")}>«--</button>
        <h3>Nombre del plato</h3>
      </header>
      <div className="tgview">
        <h2>Plato:</h2>{" "}
        <h4 className="tituloview">{location.state.dish.name}</h4>
        Categoría: <p>{location.state.dish.category}</p>
        Restaurante: <h3>{location.state.restaurant}</h3>
        Precio: <p>{location.state.dish.price}</p>
        <button
          onClick={() => {
            swal({
              title: "¡Su plato ha sido añadido a pedidos!",
              text: "¿Deseas pagar ya el plato?",
              buttons: true,
              className: "popUp",
            }).then(async (value) => {
              if (value) {
                await new Promise((resolve) => setTimeout(resolve, 200));
                history.push("/address");
              } else {
                swal.close();
              }
            });
          }}
        >
          Pedir plato
        </button>
        <section>
          <MapContainer
            center={coordinates}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "30vh", width: "94vw" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={`https://api.mapbox.com/styles/v1/tamaragmartin/ckuykd13k01un14of1yunvqli/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_KEY}`}
            />
            <Marker
              position={coordinates}
              icon={
                new Icon({
                  iconUrl: markerIconPng,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
            >
              <Popup>
                Nombre restaurante <br /> dirección <br />
              </Popup>
            </Marker>
            );
          </MapContainer>
        </section>
        <Footer />
      </div>
    </section>
  );
};

export default More_Info;
