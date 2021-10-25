import React from "react";
import { Link } from "react-router-dom";

const Confirm_Order = () => {
  return (
    <section className="order">
      <h4 className="order--title">Resumen de tu pedido</h4>
      <div className="order--box">
        <img src="" alt="" />
        <p>Nombre del plato</p>
        <p>Precio</p>
        <p>Tiempo estimado</p>
        <p>Dirección de envío</p>
        <p></p>
        <p>Método de pago</p>
        <p></p>
      </div>
      <h4 className="order--title">Añadir o quitar productos</h4>
      <button>-1+</button>
      <Link to={`/orderconfirmation`}>
        <button>Pedir plato</button>
      </Link>
      {/* PENDIENTE: Añadir Sweet Alert */}
    </section>
  );
};

export default Confirm_Order;
