import React from "react";
import { useState, useEffect, useRef } from "react";
import {db, auth, google} from '../../firebase';
import './Chat.css'

import Agregar from '../Agregar';
import Navbar from "../Navbar/Navbar";


const Chat = () => {

  const scroll = useRef()
  const [mensajes, setMensajes] = useState([]);
  console.log(mensajes)
  useEffect(() => {
    db.collection('chat').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
        setMensajes(snapshot.docs.map(doc => doc.data()))
    })
}, [])


  return(

    <div>
    <div className="msgs">
  
  

        {

          mensajes.map(({id, text, photoURL, uid}) => {
            console.log(mensajes);
            return <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                <img src={photoURL} alt="" className="fotochat"/>
               { console.log({photoURL})}
                 <p className="textochat">{text}</p>
                 
               </div>
          })

        }


      
      
      {/* <div className='d-flex justify-content-start mb-2'>
        <span className="badge bg-success">
          mensaje de uno
        </span>
      </div> */}
      

   

    <Agregar scroll={scroll}/>
    <div ref={scroll}></div>
</div>
 </div>

)

};

export default Chat;
