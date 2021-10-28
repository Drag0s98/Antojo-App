import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

import wave1 from "../../styles/assets/img/svg/wave.1svg.svg";
import wave2 from "../../styles/assets/img/svg/wave2.svg.svg";

const Onboarding = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <section className="onboarding">
      <img src={wave1} alt="" className="onboarding--top-wave" />
      <article className="onboarding--carousel">
        <Carousel activeIndex={index} onSelect={handleSelect} variant="dark">
          <Carousel.Item>
            <div className="onboarding--carousel--item">
              <h1>¡Bienvenido a Yamy!</h1>
              <br /><br />
              <p className="onboarding-1a">
                La primera aplicación de búsqueda de restaurantes en función de
                tu plato favorito.
              </p>
              <p className="onboarding-1b">Comida saludable a un clic.</p>
              <br /><br /><br /><br />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="onboarding--carousel--item">
              <h1>Pide lo que quieras...</h1>
              <p>1- Pide o reserva opciones vegetarianas, veganas y saludables en
                tu ciudad.</p>
              <p>2- Paga a través de la app de manera sencilla y segura. </p>
              <p>3- Disfruta de tu plato favorito. </p>
              <p>4-Yameal, la aplicación que comparte tu estilo de vida.</p>

              <br />
            </div>
          </Carousel.Item>
        </Carousel>
      </article>
      <Link to={`/login`}>
        <button type="submit" name="button" className="onboarding--btn">
          Empezar
        </button>
      </Link>
      <img src={wave2} alt="" className="onboarding--bottom-wave" />
    </section>
  );
};

export default Onboarding;
