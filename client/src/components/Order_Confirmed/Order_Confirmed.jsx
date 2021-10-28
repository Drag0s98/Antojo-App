import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import arrowleft from "../../styles/assets/img/png/arrow-left.png";
import check from '../../styles/assets/img/svg/check_confirmacion.svg'

const Order_Confirmed = () => {
  const history = useHistory();
  return (
    <section>
      <header className="header-general">
        <button className="header-general--button" onClick={() => history.push('/confirmorder')}>
        <img src={arrowleft} alt="" />
        </button>
        <h3>Confirmación</h3>
      </header>
      <div className="confirmationbox">
      <img src={check} alt="" />
      </div>
      <div className="textconfirm">
      <p>¡Gracias por su pedido! En breve recibirá una notificación</p>
      </div>
      <div className="bntconfirm">
      <Link to={`/home`}>
        <button className="bntconfirm1">Volver a pedir</button>
      </Link>
      <Link to={`/orders`}>
        <button className="bntconfirm2">Ver mis pedidos</button>
      </Link>
      </div>
    </section>
  );
};

export default Order_Confirmed;
