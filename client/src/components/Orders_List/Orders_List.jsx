import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../context/context";
import { useHistory } from "react-router-dom";
import Footer from "../Footer";

import arrowleft from "../../styles/assets/img/png/arrow-left.png"

const Orders_List = () => {
  const history = useHistory();

  const [order, setOrder] = useState(null);
  const [hour, setHour] = useState(null);


  const { uid } = useContext(DataContext);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/orders/${uid}`)
      .then((res) => setOrder(res.data));
  }, [uid]);

  useEffect(() => {

    if (order != null) {
      let arr = [];
      order.map((param) => {
        var t = param.created_at.split(/[- : T Z]/);
        var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
        var x = new Date()
        let dbDate = d.getHours() + '' + d.getMinutes();
        var fecha = x.getHours() + '' + x.getMinutes();
        let calc = (parseInt(fecha) + 30) - parseInt(dbDate);
        return arr.push(calc)
      })
      setHour(arr)
    }
  }, [order])

  return (
    order != null ?
      <>
        <header className="header-general">
          <button className="header-general--button" onClick={() => history.push("/orderconfirmation")}>
          <img src={arrowleft} alt="" />
          </button>
          <h3>Pedidos</h3>
        </header>
        <section>
          {order.map((param, i) => {
            return (
              <article key={i}>
                <img src="" alt="" />
                <h3>Estado del pedido </h3>
                <p>Plato {param.dish_name}</p>
                {hour !== null ? hour.map((param) => {
                  <div key={i}>
                    {param < 31 ? <p>El pedido se esta preparando: {param}</p> : ''}
                    {param < 16 ? <p>El pedido esta de camino: {param}</p> : ''}
                    {param < 6 ? <p>El pedido esta apunto de llegar: {param}</p> : ''}
                    {param < 1 ? <p>Pedido completado</p> : ''}
                  </div>
                }) : ''}
                <p>Precio {param.price}</p>
                <p>En camino</p>
                <button>Ver pedido</button>
              </article>
            );
          })}
        </section>
        <Footer />
      </> : setTimeout(() => { <Redirect to="/login" /> }, 200)
  );

};

//<Link to={`/orderdetails`}>
export default Orders_List;