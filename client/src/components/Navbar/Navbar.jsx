import React from "react";
import {Link, NavLink} from 'react-router-dom';
import './Navbar.css';
import { auth } from "../../firebase";
import { withRouter } from "react-router";

const Navbar = (props) => {

const cerrarSesion = () => {
  auth.signOut()
    .then(() => {
      props.history.push('/login')
    })
}

  return <div className="navbar navbar-dark bg-dark">
    <Link className="navbar-brand ml- nombre" to="/">Ñamy</Link>
    <div>
      <div className="dev-flex">
        <NavLink className="btn btn-dark mr-4 boton1 active" to="/" exact>
          Inicio
        </NavLink>
        {
          props.firebaseUser !== null ? (
            <button className="btn btn-dark" onClick={() => cerrarSesion()}>Cerrar Sesión</button>
          ) : (
              <NavLink className="btn btn-dark mr-4 boton" to="/login">
          Login
              </NavLink>
          )
        }
      
      </div>
    </div>
  </div>;
};

export default withRouter(Navbar);
