import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { usePosition } from "../../hooks/usePosition";
import Footer from "../Footer";
import ClipLoader from "react-spinners/ClipLoader";

import arrowleft from "../../styles/assets/img/png/arrow-left.png";

import search from "../../styles/assets/img/png/search.png";

function Result_Search({ location, watch, settings }) {
  //location.state saco la informacion del plato
  //Falta implementar el filto de ordenar por cercania
  const { latitude, longitude } = usePosition(watch, settings);
  const [restaurants_id, setRestaurants_id] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [coords, setCoords] = useState(null);
  const [order, setOrder] = useState(null);
  const [finish, setFinish] = useState("");
  const [loader, setLoader] = useState(false);
  const [dishes, setdishes] = useState(null);
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  //Calcular distancia
  function getDistance(origin, destination) {
    const lat1 = toRadian(origin[0]);
    const lon1 = toRadian(origin[1]);
    const lat2 = toRadian(destination[0]);
    const lon2 = toRadian(destination[1]);

    const deltaLat = lat2 - lat1;
    const deltaLon = lon2 - lon1;

    let a =
      Math.pow(Math.sin(deltaLat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
    let c = 2 * Math.asin(Math.sqrt(a));
    let EARTH_RADIUS = 6371;

    return c * EARTH_RADIUS * 1000;
  }

  function toRadian(degree) {
    return (degree * Math.PI) / 180;
  }

  useEffect(() => {
    setLoader(true);
    let arr = [];
    if (location.state !== undefined) {
      location.state.map(async (param) => {
        return await axios
          .get(`http://localhost:5000/api/dish/${param.name}`)
          .then((res) => {
            res.data.map((param) => {
              return arr.push(param.id_restaurant);
            });
            setRestaurants_id(arr);
          })
          .catch((error) => console.log(error));
      });
    }
  }, [location]);

  useEffect(() => {
    let arr = [];
    new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
      if (restaurants_id.length > 0) {
        restaurants_id.map(async (param, i) => {
          let response = await axios.get(
            `http://localhost:5000/api/restaurants/${param}`
          );
          arr.push(response.data[0]);
        });
        new Promise((resolve) => setTimeout(resolve, 1100)).then(() => {
          setRestaurants(arr);
        });
      }
    });
  }, [restaurants_id]);

  useEffect(() => {
    let array = [];
    if (restaurants !== "") {
      restaurants.map((param) => {
        let arr = param.coordinates.split(",");
        let lat = parseFloat(arr[0]);
        let lon = parseFloat(arr[1]);
        let obj = {
          name: param.name,
          lat: lat,
          lon: lon,
        };
        return array.push(obj);
      });
      new Promise((resolve) => setTimeout(resolve, 1200)).then(() =>
        setCoords(array)
      );
    } else {
      return null;
    }
  }, [restaurants]);

  useEffect(() => {
    let arr = [];
    if (coords != null) {
      coords.map((param) => {
        const distance = getDistance(
          [latitude, longitude],
          [param.lat, param.lon]
        ); // [origen lat, origen lon],[destination lat, destination lon]
        let obj = {
          name: param.name,
          distance: distance,
        };
        arr.push(obj);
        return new Promise((resolve) => setTimeout(resolve, 1400)).then(() =>
          setOrder(arr)
        );
      });
    }
    // console.log('Distancia entre los 2 puntos:' + distance)
  }, [coords]);

  useEffect(() => {
    let arr = [];
    let orden = [];
    if (order != null) {
      order.filter((element, i) => {
        arr.push(element.distance);
        return orden.push({
          distance: arr.sort((a, b) => b - a)[0],
          name: element.name,
        });
      });
    }
    new Promise((resolve) => setTimeout(resolve, 1800))
      .then(() => {
        setdishes(location.state);
        setFinish(orden);
      })
      .then(() => {
        setLoader(false);

      });
  }, [order]);

  return (
    <>
      {loader === true ? (
        <ClipLoader color={'#386641'} size={150} />
      ) : (
        <div className="resultSearch">
          <header className="header-general">
            <button
              className="header-general--button"
              onClick={() => history.push("/home")}
            >
              <img src={arrowleft} alt="" />
            </button>
            <h3>Resultados de búsqueda</h3>
          </header>
          <section className="result">
            <article className="result--box-input">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="browser"
                  placeholder="Busca plato..."
                />
                <button className="result--box-btn">
                  <img src={search} alt="" />
                </button>
              </form>
            </article>
            <br />
            <article className="list">
              {finish !== undefined && finish !== ""
                ? finish.map((param, i) => {
                  console.log(dishes);
                  return (
                    <div key={i} className="cards-container">
                      {dishes[i] !== undefined ? (
                        <img
                          className="dish-image"
                          src={dishes[i].image_web_dish}
                          alt=""
                        />
                      ) : (
                        ""
                      )}
                      <article className="overlay">
                        <h3>
                          {dishes[i] !== undefined ? dishes[i].name.substr(0, 20) + "..." : ""}
                        </h3>
                        <h4>{param.name}</h4>
                        <h4>
                          Precio{" "}
                          {dishes[i] !== undefined ? dishes[i].price : ""}
                        </h4>
                        <button className="detailsdish-btn"
                          onClick={() =>
                            history.push("/more", {
                              dish: location.state[i],
                              restaurant: param.name,
                            })
                          }
                        >
                          Más detalles
                        </button>
                      </article>
                    </div>
                  );
                })
                : ''}
            </article>
            <Footer />
          </section>
        </div>
      )}
    </>
  );
}

export default Result_Search;
