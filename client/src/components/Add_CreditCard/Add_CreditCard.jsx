import React from "react";

const Add_CreditCard = () => {
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target.elements.name.value);
    console.log(event.target.elements.number.value);
    console.log(event.target.elements.cvv.value);
    console.log(event.target.elements.date.value);
  };

  return (
    <>
      <button>«--</button>
      <h4>Añadir tarjeta</h4>
      <form action="submit" onSubmit={handleSubmit}>
        <label>Nombre del titular de la tarjeta: </label>
        <input type="text" name="name" placeholder="John Doe" />
        <label>Número de la tarjeta:</label>
        <input type="text" name="number" placeholder="#### #### #### ####" />
        <label>CVV</label>
        <input type="text" name="cvv" placeholder="###" />
        <label>Exp. Date</label>
        <input type="text" name="date" placeholder="MM/YY" />
        <input type="submit" value="+  AÑADIR TARJETA" />
      </form>
    </>
  );
};

export default Add_CreditCard;
