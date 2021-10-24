import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DataContext } from "../../context/context";

const apiURL = "http://localhost:5000/api/payment";

const Add_CreditCard = () => {
  const [card, setCard] = useState(null);
  const { uid, setUid } = useContext(DataContext);

   useEffect(() => {
     axios.get(`${apiURL}`).then((response) => {
       setCard(response.data);
     });
   }, []);

  // if (!card) return "No Credit Card!";

  function postCard (event) {
    event.preventDefault();
    axios.post(apiURL, {
        uid: uid.uid,
        titular: event.target.elements.name.value,
        card_num: event.target.elements.number.value,
        cvv: event.target.elements.cvv.value,
        exp_date: event.target.elements.date.value,
        card_name: event.target.elements.alias.value
      }) 
      .then((response) => {
        setCard(response.data);
      });
      
      console.log(uid.uid)
      console.log(event.target.elements.name.value)
      console.log(event.target.elements.number.value)
      console.log(event.target.elements.cvv.value)
      console.log(event.target.elements.date.value)
      console.log(event.target.elements.alias.value)
  };

  return (
    <>
      <button>«--</button>
      <h4>Añadir tarjeta</h4>
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
        {/* PENDIENTE: Añadir al botón la funcionalidad de volver a la pantalla anterior (9.Proceso de pago) con la tarjeta ya pintada  */}
      </form>
    </>
  );
};

export default Add_CreditCard;
