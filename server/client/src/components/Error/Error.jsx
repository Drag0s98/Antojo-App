import React from "react";

import { Link } from "react-router-dom";

import yamealsad from '../../styles/assets/img/svg/emoji-sad.svg'

const Error = () => {
  return (
    <div className="error">
      <img
        src={yamealsad}
        alt="error"
        height="350px"
        width="350px"
      />
      <div className="errorbox">
      <p className="error--text">
        ¡Lo sentimos mucho! Ha habido un problema al cargar la página
      </p>
      </div>
      <Link to={`/home`} className="errorlink">
        <div className="btnerror">
        <button type="submit" name="button" className="error--btn errorbtn">
          Volver a inicio
        </button>
        </div>
      </Link>
     
    </div>
  );
};

export default Error;
