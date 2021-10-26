import React, { useState, useEffect } from "react";

import Browser from "../Browser";
import Map from "../Map";
import axios_hook from "../../hooks/get-axios";
import PropagateLoader from "react-spinners/PropagateLoader";

const Home = () => {
  const [ranking, setRanking] = useState(null);
  const [spinner, setSpinner] = useState(false);

  const { loading, result } = axios_hook("http://localhost:5000/api/dishes");

  useEffect(() => {
    let numA = 5;
    let arr = [];
    result.filter((element) => {
      if (element.rating < numA || element.rating === 5) {
        numA = element.rating;
        return arr.push(element);
      } else {
        return null;
      }
    });
    console.log(arr);
    setRanking(arr);
  }, [loading, result]);

  useEffect(() => {
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
    }, 2000);
  }, []);

  return (
    <section>
      
      {spinner ? (
        <div>
          <PropagateLoader size={15} color={"#FF9D47"} loading={spinner} />
        </div>
      ) : (
        <section className="prueba">
          <div>
            <PropagateLoader size={15} color={"#FF9D47"} loading={spinner} />
          </div>
          <section>
            <header>
              <img src="" alt="" />
            </header>
            <Browser />
            <Map />
            <article className="ranking_box">
              <h2>Top 3 platos</h2>
              {ranking != null
                ? ranking.map((param, i) => {
                    return (
                      <p key={i}>
                        {param.name}<br />
                        {param.price}
                      </p>
                    );
                  })
                : ""}
            </article>
            <article className="offer_box">
              <h2>Ofertas</h2>
              {ranking != null
                ? ranking.map((param, i) => {
                    if (param.offer === true) {
                      return (
                        <p key={i}>
                          {param.name}<br />
                          {param.price}
                        </p>
                      );
                    } else {
                      return null;
                    }
                  })
                : ""}
            </article>
            <article className="recomendation_box">
              <h2>Recomendaciones</h2>
              <p>Aqui irían las recomendaciones</p>
            </article>
          </section>
        </section>
      )}
    </section>
  );
};

export default Home;
