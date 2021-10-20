import React, { useContext, useEffect } from "react";


import Map from '../Map';
import { DataContext } from '../../context/context'
import axios_hook from '../../hooks/get-axios'


const Browser = () => {

  const { restaurants, setRestaurants } = useContext(DataContext);

  const searchDish = (e) => {
    console.log(e.target.value);
  }

  return (
    <section>
      <h1>Bienvenido a Antojo!</h1>
      <label>Introduce una busca </label>
      <input type="text" name="browser" placeholder='hamburguesa' onChange={searchDish} />
      {restaurants.map((param) => {
        return (
          <article>
            <p>{param.name}</p>
            <br /><br />
            <p>{param.address}</p>
          </article>
        )
      })}
      <Map />
    </section>
  );
};
export default Browser;