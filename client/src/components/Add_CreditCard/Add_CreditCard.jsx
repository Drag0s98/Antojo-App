import React, { useState, useEffect } from "react";
import axios from "axios";

const apiURL = "http://localhost:5000/api/payment";

const Add_CreditCard = () => {
  const [card, setCard] = useState(null);

   useEffect(() => {
     axios.get(`${apiURL}`).then((response) => {
       setCard(response.data);
     });
   }, []);

  // if (!card) return "No Credit Card!";

  function postCard (event) {
    event.preventDefault();
    axios.post(apiURL, {
        titular: event.target.elements.name.value,
        card_num: event.target.elements.number.value,
        cvv: event.target.elements.cvv.value,
        exp_date: event.target.elements.date.value
      })
      .then((response) => {
        setCard(response.data);
      });
  };

  return (
    <>
      <button>«--</button>
      <h4>Añadir tarjeta</h4>
      <form action="submit" onSubmit={postCard}>
        <label>Nombre del titular de la tarjeta: </label>
        <input type="text" name="name" placeholder="John Doe" />
        <label>Número de la tarjeta:</label>
        <input type="text" name="number" placeholder="#### #### #### ####" />
        <label>CVV</label>
        <input type="text" name="cvv" placeholder="###" />
        <label>Exp. Date</label>
        <input type="text" name="date" placeholder="MM/YY" />
        <input type="submit" value="+  AÑADIR TARJETA" /> 
        {/* PENDIENTE: Añadir al botón la funcionalidad de volver a la pantalla anterior (9.Proceso de pago) con la tarjeta ya pintada  */}
      </form>
    </>
  );
};

export default Add_CreditCard;
