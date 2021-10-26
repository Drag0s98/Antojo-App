import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../../context/context";

const Credit_Cards = () => {

  const history = useHistory();
  const { uid } = useContext(DataContext);
  const [myCards, setMyCards] = useState('')

  const {orders} = useContext(DataContext);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/payment/${uid}`)
      .then((res) => setMyCards(res.data))
  }, [uid])

  return (
    <section>
      {orders.name}
      {myCards !== '' ?
        myCards.map((param, i) => {
          return (
            <article key={i}>
              <p>{param.card_name}</p>
            </article>
          )
        })

        : ''}
      <button onClick={() => history.push('/addcard')}>Add Card</button>
    </section>
  );
};

export default Credit_Cards;
