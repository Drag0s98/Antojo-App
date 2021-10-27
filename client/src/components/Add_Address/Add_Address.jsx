import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";

const Add_Address = ({ location }) => {
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (location.state != null) {
      const address = {
        id_user: location.state,
        domicile: e.target.direccion.value,
        domicile_num: e.target.number.value,
        domicile_piso: e.target.piso.value
      }
      await axios.post(`http://localhost:5000/api/address`, address) 
      await new Promise(resolve => setTimeout(resolve, 1000))
      history.push('/address', address)
    }
  }

  return (
    <section>
      <article>
        <form onSubmit={handleSubmit}>
          <div className="formulario">
          <label className="elementform">Nombre</label>
          <input type="text" name='name' placeholder='nombre' className="inputform formnomb"/>
          <label className="elementform">Dirección</label>
          <input type="text" name='adress' placeholder='dirección' className="inputform formdir"/>
          <label className="elementform ">Número</label>
          <div className="downitem">
          
          <input type="number" name='number' placeholder='número' className="inputform formnumero"/>
          <label className="elementform elementpiso">Piso</label>
          <input type="text" name='piso' placeholder='piso' className="inputform formpiso"/>
          </div>
          </div>
          <button type='submit' className="onboarding--btn  btn5">Guardar Dirección</button>
        </form>
      </article>
    </section>
  );
};

export default Add_Address;
