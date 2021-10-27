import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

import axios from "axios";
import { usePosition } from "../../hooks/usePosition";


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
        if (i < 11) {
          await axios.get(`http://localhost:5000/api/dish/${param.name}`)
            .then((res) => {
              res.data.map((param) => {
                arr.push(param.id_restaurant)
              })
              setRestaurants_id(arr)
            }).catch(error => console.log(error))
        }
      })
    }
  }, [dishes, setDishes])

  

  useEffect(() => {
    let arr = []
    if (restaurants_id.length > 0) {
      new Promise(resolve => setTimeout(resolve, 1000))
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
    let array = []
    if (restaurants !== '') {
      new Promise(resolve => setTimeout(resolve, 1000))
        .then(() => {
          restaurants.map((param) => {
            let arr = param.coordinates.split(',');
            let lat = parseFloat(arr[0])
            let lon = parseFloat(arr[1])
            let obj = {
              name: param.name,
              lat: lat,
              lon: lon
            }
            return array.push(obj)
          })
          setCoords(array)
        }).catch(error => console.log(error))
    } else {
      return null;
    }
  }, [restaurants])

  useEffect(() => {
    let arr = []
    if (coords != null) {
      coords.map((param) => {
        const distance = getDistance([latitude, longitude], [param.lat, param.lon]) // [origen lat, origen lon],[destination lat, destination lon]
        let obj = {
          name: param.name,
          distance: distance
        }
        arr.push(obj)
        setOrder(arr)
      })
    }
    // console.log('Distancia entre los 2 puntos:' + distance)
  }, [coords]) //Este alert hay que dejarlo porque si no se genera un bucle infinito

  useEffect(() => {
    let arr = []
    if (order != null) {
      new Promise(resolve => setTimeout(resolve, 1500))
        .then(() => {
          order.filter((element, i) => {
            arr.push(element.distance)
            arr.sort((a, b) => a - b)
            if (arr[i] === element.distance) {
              return element
            }
          })
        })

    }
  }, [order])

  return (
    <section>
      <article>
        {order !== null ? order.map((param, i) => {
          return (
            <div key={i}>
              <p>{dishes[i].name} </p>
              <p>{param.name}</p>
              <button onClick={() => history.push('/more', {
                dish: dishes[i],
                restaurant: param.name
              })}>Pedir!</button>
            </div>
          )
        }) : ''}

      </article>

    </section>
  );
};

export default SearchBy_cat;
