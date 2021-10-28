import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../context/context";

import pb2 from '../../styles/assets/img/png/progressbar2.png';
import tarjeta from '../../styles/assets/img/svg/fondo-tarjeta-de-pago.svg';
import plus from '../../styles/assets/img/png/btn2.png';
import arrowleft from "../../styles/assets/img/png/arrow-left.png"


const Credit_Cards = () => {
  const history = useHistory();
  const { uid } = useContext(DataContext);
  const [myCards, setMyCards] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/payment/${uid}`)
      .then((res) => setMyCards(res.data));
  }, [uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let value;
    for (let i = 0; i < e.target.check.length; i++) {
      if (e.target.check[i].checked === true) {
        value = e.target.check[i].value
      }
    }
    history.push('/confirmorder', value)
  }

  return (
    <section>
      <header className="header-general">
        <button className="header-general--button" onClick={() => history.push('/address')}>
          <img src={arrowleft} alt="" />
        </button>
        <h3>Método de pago</h3>
      </header>
      <div className="pbar">
        <img src={pb2} alt="" />
      </div>
      <p className="cardsave">Tarjeta guardada:</p>
      <img src={tarjeta} alt="" />
      <form onSubmit={handleSubmit}>
        {myCards !== ""
          ? myCards.map((param, i) => {
            return (
              <article key={i}>
                <label >{param.card_name}
                  <input type="radio" name='check' value={param.card_name} />
                </label>
                <button type='submit' className="onboarding--btn btn5">Continuar</button>
              </article>
            );
          })
          : ""}
        <div className="wrapcard">
          <button onClick={() => history.push("/addcard")} className="btncredit"> <img src={plus} alt="" className="plus" />Añadir tarjeta</button>
        </div>
      </form>
    </section>
  );
};

export default Credit_Cards;
