import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../context/context";

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
    <button onClick={() => history.push('/address')}>«--</button>
      <h3>Método de pago</h3>
    </header>
      <form onSubmit={handleSubmit}>
        {myCards !== ""
          ? myCards.map((param, i) => {
            return (
              <article key={i}>
                <label >{param.card_name}
                  <input type="radio" name='check' value={param.card_name} />
                </label>
              </article>
            );
          })
          : ""}
        <button onClick={() => history.push("/addcard")}>Add Card</button>
        <button type='submit'>Continuar</button>
      </form>
    </section>
  );
};

export default Credit_Cards;
