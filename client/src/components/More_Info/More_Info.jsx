import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { DataContext } from '../../context/context';




// el coponente es More_Info , y recoge los props por location.state. Tienes un context en el padre que guarda todos los restarantes , tendras que hacerlo por peticiones a la base de datos, creo que la query esta echa, si no la puedes hacer sin problema.

function More_Info({ location }) {

    const {orders, setOrders} = useContext(DataContext);

    const objDish = {
        name: location.state.dish.name,
        category: location.state.dish.category,
        restaurant: location.state.restaurant,
        price: location.state.dish.price
    }

    
   
    useEffect(() => {
    setOrders(objDish)
    }, [location])

    return (
        <>
        <div className="tgview">
            <h2>Plato:</h2>  <h4 className="tituloview">{location.state.dish.name}</h4>
             Categoría: <p>{location.state.dish.category}</p>
             Restaurante: <h3>{location.state.restaurant}</h3>
             Precio: <p>{location.state.dish.price}</p>

             <Link to={`/card`}>
        <button type="submit" >
          Pagar
        </button>
      </Link>
             
        
             
        </div>
          
         </>
    )
}

export default More_Info;
