import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { usePosition } from "../../hooks/usePosition";

const Map = ({ watch, settings }) => {
  const { latitude, longitude } = usePosition(watch, settings);
  const [location, setLocation] = useState(false);

  useEffect(() => {
    setLocation(false);
    setTimeout(() => {
      setLocation(true);
    }, 1000);
  }, []);

  const geolocation = [latitude, longitude];

  return (
    <>
      {location ? (
        <section>
          <MapContainer
            center={geolocation}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "50vh", width: "94vw" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={`https://api.mapbox.com/styles/v1/tamaragmartin/ckuykd13k01un14of1yunvqli/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_KEY}`}
            />

            {coordinates.map((param) => {
              return <Marker
                position={param}
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
                </Popup>
              </Marker>
            })}
          </MapContainer>
        </section>
      ) : null}
    </>
  );
};

export default Map;
