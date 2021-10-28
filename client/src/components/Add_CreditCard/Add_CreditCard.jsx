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
        <button  className="header-general--button" onClick={() => history.push('/card')}><img src={arrowleft} alt="" /></button>
        <h3>Añadir tarjeta</h3>
        <p>Hola</p>
      </header>
      {orders.name}
      <form action="submit" onSubmit={postCard}>
        <label>Crea un alias para tu tarjeta: </label>
        <input type="text" name="alias" placeholder="P.ej: Tarjeta BBVA, ... " /><br />
        <label>Nombre del titular de la tarjeta: </label>
        <input type="text" name="name" placeholder="John Doe" /><br />
        <label>Número de la tarjeta:</label>
        <input type="text" name="number" placeholder="#### #### #### ####" /><br />
        <label>CVV</label>
        <input type="text" name="cvv" placeholder="###" />
        <label>Exp. Date</label>
        <input type="text" name="date" placeholder="MM/YY" /><br />
        <input type="submit" value="+  AÑADIR TARJETA" />
      </form>
    </>
  );
};

export default Add_CreditCard;
