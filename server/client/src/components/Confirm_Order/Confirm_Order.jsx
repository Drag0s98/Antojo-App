import React, { useContext, useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { DataContext } from "../../context/context";
import axios from "axios";
import swal from "sweetalert";

import arrowleft from "../../styles/assets/img/png/arrow-left.png";

const Confirm_Order = ({ location }) => {
  const { orders, uid } = useContext(DataContext);

  const [address, setAddress] = useState(null);
  const [contadorValue, actualizarContador] = useState(1);

  const history = useHistory();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/address/${uid}`).then((res) => {
      setAddress(res.data[0]);
    });
  }, [uid]);

  return (
    <section className="order">
      <header className="header-general">
        <button
          className="header-general--button"
          onClick={() => history.push("/card")}
        >
          <img src={arrowleft} alt="" />
        </button>
        <h3>Resumen de tu pedido</h3>
      </header>
      <div className="confirm-order-container">
        {orders ? (
          <>
            <section className="confirmorder-box">
              <img
                className="confirmimage"
                src={orders[1].image}
                alt={orders[1].name}
                width="150px"
                height="150px"
                //className="img_list"
              />
              <article className="confirmorder-details">
                <p className="confirmorder-title"> {orders[1].name}</p>

                <p>Tiempo estimado: 35 minutos</p>

                {address ? (
                  <p>
                    Dirección de envío: {address.domicile} número{" "}
                    {address.domicile_num} {address.domicile_piso}{" "}
                  </p>
                ) : (
                  ""
                )}

                <p>Precio: {orders[1].price} €</p>

                <p>Método de pago: Tarjeta {location.state} </p>
              </article>
            </section>
            <p className="order--title">Añadir o quitar producto:</p>
            <div className="buttons-group-confirm">
              <button className="button-double"
                onClick={() => {
                  if (contadorValue > 1) {
                    actualizarContador(contadorValue - 1);
                  }
                }}
              >
                -
              </button>
              <span>{contadorValue}</span>
              <button className="button-double"
                onClick={() => {
                  actualizarContador(contadorValue + 1);
                }}
              >
                +
              </button>
            </div>
            <br />
            <button
              className="confirmorder-btn"
              onClick={() => {
                swal({
                  title: "¿Confirmar pedido?",
                  buttons: true,
                }).then(async (value) => {
                  if (value) {
                    await new Promise(resolve => setTimeout(resolve, 500))
                    await axios.post(`http://localhost:5000/api/orders`, {
                      id_user: uid,
                      dish_name: orders[1].name,
                      price: orders[1].price,
                      cantidad: contadorValue,
                      image: orders[1].image,
                    });
                    history.push("/orderconfirmation");
                  } else {
                    swal.close();
                  }
                });
              }}
            >
              Pedir plato{" "}
            </button>
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </div>
    </section>
  );
};

export default Confirm_Order;
