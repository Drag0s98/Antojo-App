import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Order_Confirmed = () => {

  const history = useHistory();


  return (
    <section>
      <header className="header-general">
    <button onClick={() => history.push('/confirm_order')}>«--</button>
      <h3>Confirmación</h3>
    </header>
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
