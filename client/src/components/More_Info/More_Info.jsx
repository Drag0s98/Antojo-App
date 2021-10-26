import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { DataContext } from "../../context/context";

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
    <>
      <div className="tgview">
        <img src="" alt="" /> 
        <h3 className="tituloview">{location.state.dish.name}</h3>
        <p>(PENDIENTE: Añadir descripción)</p>
        <h4>Precio</h4>
        <p>Precio del plato {location.state.dish.price}</p>
        <p>Precio del servicio 2,90 </p>

        <h5>Ubicación</h5>
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
              {location.state.restaurant.name} <br /> 
              {location.state.restaurant.address} <br />
              </Popup>
            </Marker>
          </MapContainer>
        </section>
        <p>{location.state.restaurant.address}</p>




        <button
          onClick={() => {
            history.push("/card");
          }}
        >
          Pedir plato
        </button>
      </div>
    </>
  );
}

export default More_Info;
