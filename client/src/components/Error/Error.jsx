import React from "react";

import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="error">
      <img
        src="https://static.vecteezy.com/system/resources/previews/003/435/646/non_2x/error-404-with-the-cute-melon-fruit-mascot-free-vector.jpg"
        alt="error"
        height="350px"
        width="350px"
      />
      <p className="error--text">
        ¡Lo sentimos mucho! Ha habido un problema al cargar la página
      </p>
      <Link to={`/home`}>
        <button type="submit" name="button" className="error--btn">
          Volver a explora
        </button>
      </Link>
    </div>
  );
};

export default Error;
