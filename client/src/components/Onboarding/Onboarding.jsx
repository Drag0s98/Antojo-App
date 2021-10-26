import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

import wave1 from '../../styles/assets/img/svg/wave.1svg.svg'
import wave2 from '../../styles/assets/img/svg/wave2.svg.svg'


const Onboarding = () => {
  const [index, setIndex] = useState(0);


  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <section className="onboarding">
       <img src={wave1} alt="" className='onboarding--top-wave' />
      <article className="onboarding--carousel">
        <Carousel activeIndex={index} onSelect={handleSelect} variant="dark">
          <Carousel.Item>
            <div className="onboarding--carousel--item">
              <h1>¡Bienvenido a Yamy!</h1>
              <p>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </p>
              <p>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </p>
              <br />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="onboarding--carousel--item">
              <h1>Pide lo que quieras...</h1>
              <p>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </p>
              <p>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </p>
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
      <img src={wave2} alt="" className='onboarding--bottom-wave' />
    </section>
  );
};

export default Onboarding;
