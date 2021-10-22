import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";


const Onboarding = () => {
  const [index, setIndex] = useState(0);
  
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <section className="onboarding">
      <article className="onboarding--text">
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
        sint. Velit officia consequat duis enim velit mollit. Exercitation
        veniam consequat sunt nostrud amet.
      </article>
      <article className="onboarding--carousel">
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img className="d-block w-100" src="https://image.freepik.com/free-photo/chef-cooking-food-restaurant-kitchen_53876-67.jpg" alt="First slide" />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="https://image.freepik.com/free-photo/friends-enjoying-lunch-restaurant_329181-11934.jpg" alt="Second slide" />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </article>
      <Link to={`/home`}>
        <button type="submit" name="button" className="onboarding--btn">
          Saltar
        </button>
      </Link>
    </section>
  );
};

export default Onboarding;
