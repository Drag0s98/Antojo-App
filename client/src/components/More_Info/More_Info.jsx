import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { DataContext } from '../../context/context';





// el coponente es More_Info , y recoge los props por location.state. Tienes un context en el padre que guarda todos los restarantes , tendras que hacerlo por peticiones a la base de datos, creo que la query esta echa, si no la puedes hacer sin problema.

function More_Info({ location }) {

  const history = useHistory();

  const { orders, setOrders } = useContext(DataContext);
  const [morerestaurants, setMorerestaurants] = useState([]);

  const objDish = {
    name: location.state.dish.name,
    category: location.state.dish.category,
    restaurant: location.state.restaurant,
    price: location.state.dish.price
  }
  let objRestaurant = {}
  useEffect(() => {
    axios.get(`http://localhost:5000/api/restaurants/0${location.state.restaurant}`)
      .then((res) => {
        console.log(res.data);
        objRestaurant = res.data[0]
        setOrders([objRestaurant, objDish])//Le meto toda la informacion de ese restaurante
      })
  }, [location])

  useEffect(() => {
    axios.get(`http://localhost:5000/api/dish/${location.state.dish.name}`)
      .then((res) => {
        console.log(res.data);
        res.data.map((param) => {
          axios.get(`http://localhost:5000/api/restaurants/${param.id_restaurant}`)
            .then((res) => {
              console.log(res.data);
            })
        })
      })
  }, [orders])

  return (
    <>
      <div className="tgview">
        <h2>Plato:</h2>  <h4 className="tituloview">{location.state.dish.name}</h4>
        Categoría: <p>{location.state.dish.category}</p>
        Restaurante: <h3>{location.state.restaurant}</h3>
        Precio: <p>{location.state.dish.price}</p>
        <button onClick={() => {
          history.push('/card')
        }} >
          Pagar
        </button>
      </div>
    </>
  )
}

export default More_Info;
