import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { DataContext } from "../../context/context";

import pb from '../../styles/assets/img/png/progessbar1.png';
import plus from '../../styles/assets/img/png/btn2.png';
import arrowleft from "../../styles/assets/img/png/arrow-left.png"


const Address = () => {
  const [addres, setAddres] = useState(null);
  const { uid } = useContext(DataContext);

  const history = useHistory();

  useEffect(() => {
    if (uid !== null) {
      axios.get(`http://localhost:5000/api/address/${uid}`).then((res) => {
        setAddres(res.data[0]);
      });
    }
  }, [uid]);

  const handleClick = () => {
    history.push("/add/address", uid);
  };

  return (
    <section>
      <header className="header-general">

        <button className="header-general--button" onClick={() => history.push('/more')}>
          <img src={arrowleft} alt="" />

        </button>
        <h3>Selecciona dirección</h3>
      </header>
      <div className="pbar">
        <img src={pb} alt="" />
      </div>
      <article>

        {/* Borrar */}
        {/* <div className="domicile_box">
              <p>Name:</p>
              <p>Domicile:</p>
              <p>Domicile num:</p>
              <p>Domicile piso:</p> */}
        {/* <button onClick={handleClick}>Cambiar domicilio</button> */}

        {/* </div>
              <div className="wpbtb">
             <img src={plus} alt="" className="plus"/> <button onClick={handleClick} className="adddirectionbtn">Añadir dirección</button>
              </div> */}
        <div>
          {addres ?
            <>
              <p className="directtitle">Dirección guardada:</p>
              <div className="domicile_box">
                <p>Dirección: {addres.domicile}</p>
                <p>Número: {addres.domicile_num}</p>
                <p>Piso: {addres.domicile_piso}</p>
                {/* <button onClick={handleClick}>Cambiar domicilio</button> */}

              </div>

              <img src={plus} alt="" className="plus plus2" /> <button onClick={handleClick} className="adddirectionbtn">Añadir dirección</button>
              <button className="onboarding--btn btn4 btn6" onClick={() => history.push('/card')}>Continuar</button>

            </>
            : (
              <>
                <div className="btnadd">
                  <img src={plus} alt="" className="plus" /> <button onClick={handleClick} className="adddirectionbtn">Añadir dirección</button>
                  <button className="onboarding--btn btn4" onClick={() => history.push('/card')}>Continuar</button>
                </div>
              </>

            )}
        </div>
      </article>
    </section>
  );
};

export default Address;
