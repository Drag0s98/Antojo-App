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
          <label>Direccion del domicilio</label>
          <input type="text" name='direccion' placeholder='calle' />
          <label>Numero</label>
          <input type="number" name='number' placeholder='00' />
          <label>Piso</label>
          <input type="text" name='piso' placeholder='1A' />
          <button type='submit'>Guardar Direccion</button>
        </form>
      </article>
    </section>
  );
};

export default Add_Address;
