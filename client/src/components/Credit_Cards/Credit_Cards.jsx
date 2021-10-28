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
  const [myCards, setMyCards] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/payment/${uid}`)
      .then((res) => {
        if (Object.keys(res.data).length === 0) {
          setMyCards(null);
        } else {
          setMyCards(res.data)
        }
      }).catch(error => console.log(error))
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


  let style = {
    visibility: "hidden"
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
      <form onSubmit={handleSubmit}>
        {myCards !== null
          ? myCards.map((param, i) => {
            return (
              <article key={i}>
                <label className="nombrebanco">
                  <p className="cardsave">Tarjeta guardada: {param.card_name}</p>
                  <p className="numerocuenta">Número: **** **** ** **** ****</p>
                  <p className="expdate">Exp.date: **/**</p>
                  <p className="cvv">CVV: ***</p>
                  <img src={tarjeta} alt="" className="tarjeta11" />
                  <input type="radio" name='check' value={param.card_name} className='radioBtn' />
                </label>
              </article>
            );
          })
          :
          <>
            <p className="cardsave" >Tarjeta guardada: No hay tarjeta</p>
            <p className="numerocuenta" style={style}>Número: **** **** ** **** ****</p>
            <p className="expdate" style={style}>Exp.date: **/**</p>
            <p className="cvv" style={style}>CVV: ***</p>
            <img src={tarjeta} alt="" className="tarjeta11" style={style} />
          </>
        }
        <div className="wrapcard">
          <button onClick={() => history.push("/addcard")} className="btncredit btncredit11"> <img src={plus} alt="" className="plus" />Añadir tarjeta</button>
        </div>
        <button type='submit' className="onboarding--btn btn5 botoncontinuar">Continuar</button>
      </form>
    </section>
  );
};

export default Credit_Cards;
