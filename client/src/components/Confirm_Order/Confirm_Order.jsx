import React, { useContext, useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { DataContext } from "../../context/context";
import axios from "axios";
import swal from 'sweetalert';

const Confirm_Order = ({ location }) => {
  const { orders, uid, setConfirmed } = useContext(DataContext);

  const [address, setAddress] = useState(null)
  const [contadorValue, actualizarContador] = useState(1);

  const history = useHistory();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/address/${uid}`)
      .then((res) => {
        setAddress(res.data[0])
      })
  }, [uid])

  console.log(address);
  console.log();

  return (
    <section className="order">
      <header className="header-general">
    <button onClick={() => history.push('/card')}>«--</button>
      <h3>Resumen de su pedido</h3>
    </header>
      
      <div className="order--box">
        {orders ?
          <>
            <img src="" alt="" />
            <p>Nombre del plato: {orders[1].name}</p>
            <p>Precio:  {orders[1].price}</p>
            <p>Tiempo estimado: 35 minutes</p>
            {address ?
              <p>Dirección de envío {address.domicile} numero {address.domicile_num} {address.domicile_piso} </p>
              : ''
            }
            <p></p>
            <p>Método de pago: Tarjeta {location.state} </p>
            <button onClick={() => {
              if (contadorValue > 1) {
                actualizarContador(contadorValue - 1)
              }
            }}>-</button>
            <span>{contadorValue}</span>
            <button onClick={() => { actualizarContador(contadorValue + 1) }}>+</button>
            <h4 className="order--title">Añadir o quitar productos</h4>
            <button onClick={() => {
              swal({
                title: "¿Confirmar pedido?",
                buttons: true,
              })
                .then(async (value) => {
                  if (value) {
                    console.log(orders);
                    await new Promise(resolve => setTimeout(resolve, 500))
                    await axios.post(`http://localhost:5000/api/orders`, {
                      id_user: uid,
                      dish_name: orders[1].name,
                      price: orders[1].price,
                      cantidad: contadorValue
                    })
                    history.push('/orderconfirmation')
                  } else {
                    swal.close();
                  }
                })
            }}>Pedir plato </button>
          </> : <Redirect to='/login' />
        }
      </div>
    </section>
  );
};

export default Confirm_Order;
