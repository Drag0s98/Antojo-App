import React from "react";
import { Link } from "react-router-dom";

const Order_Confirmed = () => {
  return (
    <section>
      <img src="" alt="" />
      <p>¡Gracias por su pedido! En breves recibirá una notificación</p>
      <Link to={`/home`}>
        <button>Volver a pedir</button>
      </Link>
      <Link to={`/orders`}>
        <button>Ver mis pedidos</button>
      </Link>
    </section>
  );
};

export default Order_Confirmed;
