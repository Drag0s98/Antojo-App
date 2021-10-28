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
        let calc = (parseInt(dbDate) - parseInt(fecha) + 30);
        return arr.push(calc)
      })
      setHour(arr)
    }
  }, [order])

  return (
    (order != null && hour !== null) ?
      <div className='orders_container'>
        <header className="header-general">
          <button className="header-general--button" onClick={() => history.push("/orderconfirmation")}>
            <img src={arrowleft} alt="" />
          </button>
          <h3>Pedidos</h3>
        </header>
        <section className='orders_list_body'>
          {order.map((param, i) => {
            return (
              <article key={i} className='order_list'>
                <div className='img_box'>
                  <img src={param.image} alt="" width='80px' height='80px' />
                </div>
                <div className='right_box'>
                  <h3>Estado del pedido </h3>
                  <p>Plato {param.dish_name}</p>
                  <p>Cantidad {param.cantidad}</p>
                  <p>Precio {param.price} €</p>
                </div>
                <div className='bot_box'>
                  {hour !== null ?
                    <div className='hour_box'>
                      {(hour[i] < 31 && hour[i] > 16) ? <p className='procesando'>🟢 Procesando ({hour[i]}:00)</p> : ''}
                      {(hour[i] < 16 && hour[i] > 6) ? <p className='camino'>🏃🏼‍♂️ En camino: ({hour[i]}:00)</p> : ''}
                      {(hour[i] < 6 && hour[i] > 1) ? <p className='llegando'> 📦 Llegando: ({hour[i]}:00)</p> : ''}
                      {(hour[i] < 1 || hour[i] > 30) ? <p className='completado'>🔴 Completado</p> : ''}
                    </div>
                    : ''}
                  <button onClick={() => history.push('/chat')}>Att.Cliente</button>
                </div>
                <hr />
              </article>
            );
          })}
        </section>
        <Footer />
      </div> : setTimeout(() => { <Redirect to="/login" /> }, 200)
  );

};

//<Link to={`/orderdetails`}>
export default Orders_List;