import React from "react";
import { useState, useEffect, useRef } from "react";
import { db, auth } from '../../firebase';
import { useHistory } from "react-router-dom";


import Agregar from '../Agregar';
import logo from '../../styles/assets/img/svg/yameal-small-logo.svg';
import arrowleft from "../../styles/assets/img/png/arrow-left.png"




const Chat = () => {

  const history = useHistory();
  const scroll = useRef()
  const [mensajes, setMensajes] = useState([]);
  useEffect(() => {
    db.collection('chat').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
      setMensajes(snapshot.docs.map(doc => doc.data()))
    })
  }, [])


  return (

    <div className='chat_container'>
      <header className="header-general">
        <button className="header-general--button" onClick={() => history.push("/orders")}>
          <img src={arrowleft} alt="" />
        </button>
        <h3>Contacta con nosotros</h3>
      </header>
      <div className="msgs">
        {
          mensajes.map(({ id, text, photoURL, uid }) => {
            return <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
              <p className="textochat">{text}</p>
              <img src={photoURL !== null ? photoURL : logo} alt="" className="fotochat" />
            </div>
          })
        }
          <Agregar scroll={scroll} />
        <div ref={scroll}></div>
      </div>
    </div>

  )

};

export default Chat;
