import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";

const Order_Details = () => {
  return (
    <section>
      <div className="details">
        <h3>Nombre del plato</h3>
        <p>Descripción del plato?</p>
        <h4>Precio</h4>
        <p>Precio del plato</p>
        <p>Precio del servicio</p>
      </div>
      <div className="map">
        {/* Insertar mapa con la dirección de casa en el marker */}
      </div>
      <div className="problem">
        <p>Algún problema con el pedido?</p>
        <Link to={`/chat`}>
          <button>Contacta con nosotros</button>
        </Link>
      </div>
      <Footer />
    </section>
  );
};

export default Order_Details;
