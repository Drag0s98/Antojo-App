import React, { useState, useEffect } from "react";

import Browser from '../Browser';
import Map from '../Map';
import axios_hook from '../../hooks/get-axios';
import Loading from '../Loading';
import Footer from "../Footer";
import smalllogo from '../../styles/assets/img/svg/yameal-small-logo.svg'

import { useHistory } from "react-router-dom";


const Home = ( {location} ) => {
  const [ranking, setRanking] = useState(null);
  const [spinner, setSpinner] = useState(false);

  let history = useHistory();

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
<div className="home">
      {spinner === true ? (
        <Loading />
      ) : (
        <section className="prueba">
          <header className="header-general">
            <img src={smalllogo} className="smallogo1" />
          </header>
          <section>
            <Browser />
            <Map />
            <article className="ranking_box">
              <h2>Top platos </h2>
              {ranking != null
                ? ranking.map((param, i) => {
                    return <div key={i} className="home-cards-container">
                      <img className="home-dish-image" src={param.image_web_dish} alt="" />
                      <article className="home-overlay"> 
                      <h3 className="home-dish-title">{param.name.substr(0,20)+"..."}</h3>
                      <button className="detailsdish-btn"
                            onClick={() =>
                              history.push("/more", {
                                dish: location.state[i],
                                restaurant: param.name,
                              })
                            }
                          >
                            Más detalles
                          </button>
                      </article>
                      </div>;
                  })
                : ""}
            </article>
            <br />
            <article className="offer_box">
              <h2>Ofertas</h2>
              {ranking != null
                ? ranking.map((param, i) => {
                    if (param.offer === true) {
                      return <p key={i}>{param.name}</p>;
                    } else {
                      return null;
                    }
                  })
                : ""}
            </article>
          </section>
          <Footer />
        </section>
      )}
    </div>
  );
};
export default Home;
