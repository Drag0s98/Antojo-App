import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { DataContext } from "../../context/context";

import Footer from "../Footer";
import swal from "sweetalert";

import arrowleft from "../../styles/assets/img/png/arrow-left.png";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

function More_Info({ location }) {
  const history = useHistory();

  const { setOrders } = useContext(DataContext);

  const objDish = {
    name: location.state.dish.name,
    category: location.state.dish.category,
    restaurant: location.state.restaurant,
    price: location.state.dish.price,
    image: location.state.dish.image_web_dish
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/more/${location.state.restaurant}`)
      .then((res) => {
        let objRestaurant = res.data[0];
        setOrders([objRestaurant, objDish]); //Le meto toda la informacion de ese restaurante y del plato
      });
  }, [location]);

  const coordinates = [40.41328, -3.70376]; // Coger coordenadas del restaurante

  return (
    <section className="moreInfo">
      <header className="header-general">
        <button className="header-general--button" onClick={() => history.push("/home")}>
          <img src={arrowleft} alt="" />
        </button>
        <h3>Nombre del plato</h3>
      </header>
      <div className="tgview">
        <img className="more-dish-image" src={location.state.dish.image_web_dish} alt="" />
        <h4 className="tituloview">{location.state.dish.name}</h4>
        <p>Nuestro bowl especial, y el favorito de nuestro chef. Hecho con ingredientes naturales y frescos, aportando a nuestra dieta el toque saludable que necesita tu día. Nuestros bowls son la alternativa a la comida rápida, con mezcla de ingredientes, sabores y texturas que no te dejarán indiferente.</p>
        {/* <p>{location.state.dish.category}</p> */}
        <h3 className="moreinfo-price">Precio</h3>
        <p className="moreinfo-pricedetail">Precio del plato: {location.state.dish.price}</p>
        <p className="moreinfo-pricedetail">Precio del servicio: 2,90</p>
        {/* Restaurante: <h3>{location.state.restaurant}</h3> */}
        
        <button className="moreinfo-btn"
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
          <h4 className="moreInfo-location">Ubicación</h4>
          <MapContainer
            center={coordinates}
            zoom={15}
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
                <p>{location.state.restaurant}</p>
              </Popup>
            </Marker>
            );
          </MapContainer>
          <p className="moreinfo-pricedetail">{location.state.restaurant}</p> 
        </section>
        <Footer />
      </div>
    </section>
  );
}

export default More_Info;
