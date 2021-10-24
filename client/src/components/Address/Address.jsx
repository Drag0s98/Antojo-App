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
      <article>
        <h4>Seleccione una direccion</h4>
        <div className='domicile_box'>
          {addres !== null ?
            <>
              <p>Name {addres.name}</p>
              <p>Domicile {addres.domicile}</p>
              <p>Domicile num {addres.domicile_num}</p>
              <p>Domicile piso {addres.domicile_piso}</p>
              <button onClick={handleClick}>Cambiar domicilio</button>
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
