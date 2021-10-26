import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { DataContext } from '../../context/context';
import swal from 'sweetalert';





// el coponente es More_Info , y recoge los props por location.state. Tienes un context en el padre que guarda todos los restarantes , tendras que hacerlo por peticiones a la base de datos, creo que la query esta echa, si no la puedes hacer sin problema.

function More_Info({ location }) {

  const history = useHistory();
  console.log(location.state);

  const { orders, setOrders } = useContext(DataContext); 

  const objDish = {
    name: location.state.dish.name,
    category: location.state.dish.category,
    restaurant: location.state.restaurant,
    price: location.state.dish.price
  }

  useEffect(() => {
    axios.get(`http://localhost:5000/api/more/${location.state.restaurant}`)
      .then((res) => {
        console.log(res.data);
        let objRestaurant = res.data[0]
        setOrders([objRestaurant, objDish])//Le meto toda la informacion de ese restaurante y del plato
      })
  }, [location])



  return (
    <>
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
      </div>
    </>
  )
}

export default More_Info;
