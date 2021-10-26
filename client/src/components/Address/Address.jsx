import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { DataContext } from "../../context/context";



const Address = () => {

  const [addres, setAddres] = useState(null);
  const { uid } = useContext(DataContext)

  const history = useHistory();

  useEffect(() => {
    if (uid !== null) {
      axios.get(`http://localhost:5000/api/address/${uid}`)
        .then((res) => {
          setAddres(res.data[0])
        })
    }
  }, [uid])

  const handleClick = () => {
    history.push('/add/address', uid)
  }

  return (
    <section>
      <header className="header-general">
        <button onClick={() => history.push('/more')}>«--</button>
        <h3>Selecciona dirección</h3>
      </header>
      <article>
        <div className='domicile_box'>
          {addres ?
            <>
              <p>Name {addres.name}</p>
              <p>Domicile {addres.domicile}</p>
              <p>Domicile num {addres.domicile_num}</p>
              <p>Domicile piso {addres.domicile_piso}</p>
              <button onClick={handleClick}>Cambiar domicilio</button>
              <button onClick={() => history.push('/card')}>Continuar</button>
            </>
            :
            <>
              <button onClick={handleClick}>Agrega un domicilio</button>
            </>
          }
        </div>
      </article>
    </section>
  );
};

export default Address;
