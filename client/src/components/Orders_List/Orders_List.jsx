import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";

const Orders_List = () => {
  return (
    <section>
      <img src="" alt="" />
      <h3>Estado del pedido</h3>
      <p>Plato</p>
      <p>Tiempo</p>
      <p>Precio</p>
      <p>En camino</p>
      <Link to={`/orderdetails`}>
        <button>Ver pedido</button>
      </Link>
      <Footer />
    </section>
  );
};

export default Orders_List;
