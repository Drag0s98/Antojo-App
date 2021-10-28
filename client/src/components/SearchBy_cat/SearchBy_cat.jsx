import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

import axios from "axios";
import { usePosition } from "../../hooks/usePosition";
import Footer from "../Footer";


const SearchBy_cat = ({ location, watch, settings }) => {

  let history = useHistory();

  const { latitude, longitude } = usePosition(watch, settings);
  const [dishes, setDishes] = useState([]);
  const [restaurants_id, setRestaurants_id] = useState([]);
  const [restaurants, setRestaurants] = useState('');
  const [coords, setCoords] = useState(null);
  const [order, setOrder] = useState(null);



  //Calcular la distancia
  function getDistance(origin, destination) {

    const lat1 = toRadian(origin[0]);
    const lon1 = toRadian(origin[1]);
    const lat2 = toRadian(destination[0]);
    const lon2 = toRadian(destination[1]);

    const deltaLat = lat2 - lat1;
    const deltaLon = lon2 - lon1;

    let a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
    let c = 2 * Math.asin(Math.sqrt(a));
    let EARTH_RADIUS = 6371;

    return c * EARTH_RADIUS * 1000;
  }

  function toRadian(degree) {
    return degree * Math.PI / 180;
  }



  useEffect(() => {
    axios.get(`http://localhost:5000/api/category/${location.state.filter}`)
      .then((res) => setDishes(res.data))
      .catch(error => console.log(error))
  }, [location])


  useEffect(() => {
    let arr = []
    if (dishes.length !== 0) {
      dishes.map(async (param, i) => {
        await axios.get(`http://localhost:5000/api/dish/${param.name}`)
          .then(async (res) => {
            res.data.map((param) => {
              return arr.push(param.id_restaurant)
            })
          }).catch(error => console.log(error))
      })
      new Promise(resolve => setTimeout(resolve, 1000))
        .then(() => {
          setRestaurants_id(arr)
        })

    }
  }, [dishes, setDishes])



  useEffect(() => {
    let arr = []
    if (restaurants_id.length > 0) {
      new Promise(resolve => setTimeout(resolve, 1200))
        .then(() => {
          restaurants_id.map(async (param, i) => {
            let response = await axios.get(`http://localhost:5000/api/restaurants/${param}`)
            arr.push(response.data[0])
          })
        })
        .then(() => {
          setRestaurants(arr)
        }
        )
        .catch(error => console.log(error))
    }
  }, [restaurants_id])

  useEffect(() => {
    let array = [];
    if (restaurants !== "") {
      new Promise(resolve => setTimeout(resolve, 2000))
        .then(() => {
          restaurants.map((param, i) => {
            let arr = param.coordinates.split(",");
            let lat = parseFloat(arr[0]);
            let lon = parseFloat(arr[1]);
            let obj = {
              name: param.name,
              lat: lat,
              lon: lon,
            };
            return array.push(obj);
          }, [restaurants]);
          new Promise((resolve) => setTimeout(resolve, 2200))
            .then(() => setCoords(array))
        })
    } else {
      return null;
    }
  }, [restaurants]);

  useEffect(() => {
    let arr = []
    if (coords != null) {
      new Promise(resolve => setTimeout(resolve, 2400))
        .then(() => {
          coords.map((param, i) => {
            const distance = getDistance([latitude, longitude], [param.lat, param.lon]) // [origen lat, origen lon],[destination lat, destination lon]
            let obj = {
              name: param.name,
              distance: distance
            }
            return arr.push(obj)
          })
        })
        .then(() => setOrder(arr))
    }
    // console.log('Distancia entre los 2 puntos:' + distance)
  }, [coords]) //Este alert hay que dejarlo porque si no se genera un bucle infinito


  return (
    <section className="searchCategory">
      <header className="header-general">
        <button onClick={() => history.push("/home")}>«--</button>
        <h3>Resultaados de búsqueda</h3>
      </header>
      <article>
        {order !== null ? order.map((param, i) => {
          return (
            <div key={i}>
              {dishes[i].image_web_dish !== undefined ? <img src={dishes[i].image_web_dish} width='150px' height='150px' alt="" /> : ''}
              <p>{dishes[i].name} </p>
              <p>{param.name}</p>
              <p>{dishes[i].price}</p>
              <button onClick={() => history.push('/more', {
                dish: dishes[i],
                restaurant: param.name
              })}>Más detalles</button>
            </div>
          )
        }) : ''}
      </article>
      <Footer />
    </section>
  );
};

export default SearchBy_cat;
