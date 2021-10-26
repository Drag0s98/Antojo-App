import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { DataContext } from "../../context/context";

const Orders_List = () => {

  const [order, setOrder] = useState(null);
  const { uid } = useContext(DataContext);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/orders/${uid}`)
      .then((res) => setOrder(res.data))
  }, [uid])

  //Lo del tiempo creo que lo puedo sacar pero necesito mirarlo mas en profundidad.
console.log(order);
  return (
    order != null ?
      <section>
        {order.map((param, i) => {
          return (
            <article key={i}>
              <img src="" alt="" />
              <h3>Estado del pedido </h3>
              <p>Plato {param.dish_name}</p>
              <p>Tiempo </p>
              <p>Precio {param.price}</p>
              <p>En camino</p>
              <button >Ver pedido</button>
            </article>
          )
        })}
      </section>
      : setTimeout(() => {
        <Redirect to='/login' />
      }, 200)
  );
};

//<Link to={`/orderdetails`}>
export default Orders_List;
