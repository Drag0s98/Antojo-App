import React from "react";
//Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
//Marcador
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
const Map = () => {
  const coordinates = [40.42166, -3.69271];
  
  return (
    <div>
      <h4>Map</h4>
      <MapContainer
        center={coordinates}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "80vh", width: "50%" }} 
        // Style funciona con vh en height y % en width 
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
            The Bridge <br /> Paseo de Recoletos, 15 <br />
            <a href="https://www.thebridge.tech/">Visit website » </a>
          </Popup>
        </Marker>
        <Marker
          position={[40.42141, -3.68813]}
          icon={
            new Icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          }
        >
          <Popup>
            Puerta de Alcalá <br /> Plaza de la Independencia, s/n <br />
            <a href="https://es.wikipedia.org/wiki/Puerta_de_Alcal%C3%A1/">
              Visit website »{" "}
            </a>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
