import React, { useState, useEffect } from "react";

import Browser from '../Browser';
import Map from '../Map';
import axios_hook from '../../hooks/get-axios'


const Home = () => {

  const [ranking, setRanking] = useState(null);

  const { loading, result } = axios_hook('http://localhost:5000/api/dishes');

  useEffect(() => {
    console.log(result)
    let numA = 5;
    let arr = []
    result.filter((element) => {
      if (element.rating < numA || element.rating === 5) {
        numA = element.rating;
        return arr.push(element);
      } else {
        return null;
      }
    })
    setRanking(arr);
  }, [loading, result])

  return (
    <section>
      <Browser />
      <Map />
      <article className='ranking_box' >
        <h2>Ranking </h2>
        {ranking != null ? ranking.map((param, i) => {
          return (
            <p key={i}>
              {param.name}
            </p>
          )
        }) : ''}
      </article>
      <br />
      <article className='offer_box'>
        <h2>Ofertas</h2>
        {ranking != null ? ranking.map((param, i) => {
          if (param.offer === true) {
            return (
              <p key={i}>
                {param.name}
              </p>
            )
          } else {
            return null;
          }
        }) : ''}
      </article>
      <article className='recomendation_box'>
        <h2>Recomendacioens</h2>
        <p>Aqui irian las recomendaciones</p>
      </article>
    </section>
  );
};

export default Home;
