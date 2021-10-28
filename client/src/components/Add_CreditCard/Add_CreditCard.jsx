import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DataContext } from "../../context/context";
import { useHistory } from "react-router-dom";

import arrowleft from "../../styles/assets/img/png/arrow-left.png"

const apiURL = "http://localhost:5000/api/payment";

const Add_CreditCard = () => {
  const [card, setCard] = useState(null);
  const { uid } = useContext(DataContext);

  const { orders } = useContext(DataContext);

  const history = useHistory();
  useEffect(() => {
    axios.get(`${apiURL}`).then((response) => {
      setCard(response.data);
    });
  }, []);


  async function postCard(event) {
    event.preventDefault();
    axios.post(apiURL, {
      uid: uid,
      titular: event.target.elements.name.value,
      card_num: event.target.elements.number.value,
      cvv: event.target.elements.cvv.value,
      exp_date: event.target.elements.date.value,
      card_name: event.target.elements.alias.value
    })
      .then((response) => {
        setCard(response.data);
      });
    await new Promise(resolve => setTimeout(resolve, 1000))
    history.push('/card')
  };

  return (
    <>
    <header className="header-general">
      <button className="header-general--button" onClick={() => history.push('/card')}><img src={arrowleft} alt="" /></button>
      <h3 className="titulocard">Añadir tarjeta</h3>
    </header>
    {orders.name}
    <form action="submit" onSubmit={postCard}>
      <div className="formularios111">
        <label className="nombreaddcredit">Crea un alias para tu tarjeta: </label>
        <input className="input1addcard" type="text" name="alias" placeholder="P.ej: Tarjeta BBVA, ... " /><br />
        <label className="nombreaddcredit">Nombre del titular de la tarjeta: </label>
        <input className="input1addcard" type="text" name="name" placeholder="John Doe" /><br />
        <label className="nombreaddcredit">Número de la tarjeta:</label>
        <input className="input1addcard" type="text" name="number" placeholder="#### #### #### ####" /><br />
        <label className="cvv222">CVV</label>
        <input className="input1addcard11" type="text" name="cvv" placeholder="###" />
        <label className="expdates111">Exp. Date</label>
        <input className="input1addcard11 input1addcard111" type="text" name="date" placeholder="MM/YY" /><br />
      </div>
      <div className="divbtntarjeta">
        <input className="botnaddtarjeta" type="submit" value="+  AÑADIR TARJETA" />
      </div>
    </form>
  </>
);

};

export default Add_CreditCard;
