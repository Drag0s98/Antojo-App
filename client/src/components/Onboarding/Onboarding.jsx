import React, { useState, useContext } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/context";
const Onboarding = () => {
  const [index, setIndex] = useState(0);
  const { setHeader } = useContext(DataContext);
  setHeader(false);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <section className="onboarding">
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
    </section>
  );
};

export default Onboarding;
