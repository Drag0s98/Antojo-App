import React, { useState, useCallback, useContext } from "react";
import { auth, db, google } from "../../firebase";
import { withRouter } from "react-router";

import Navbar from "../Navbar/Navbar";
import axios from 'axios'
import { DataContext } from "../../context/context";



const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("")

  const [mensajes, setMensajes] = useState([])

  const [image, setImage] = useState('');
  const [nose, setNose] = useState(null);

  const [error, setError] = useState(null);
  const [registro, setRegistro] = useState(true);
  const { itsLog, setitsLog, uid, setUid } = useContext(DataContext)
  console.log(uid)


  const loginGoogle = () => {
    auth.signInWithPopup(google)
      .then(async (res) => {
        setitsLog(true);
        let emailForm = res.user.email;
        let uidForm = res.user.uid
        let username = res.user.displayName;
        let user = {
          uidForm,
          emailForm,
          username
        }
        let response = await axios.post(`http://localhost:5000/api/register`, user)
        console.log(response);
        await db.collection('usuarios').doc(res.user.uid).set({
          email: res.user.email,
          uid: res.user.uid,
        }); //colección usuarios
        let response_get = await axios.get(`http://localhost:5000/api/login/${res.user.email}`)
        console.log(response_get);
        setEmail("");
        setPassword("");
        setError(null);
        setitsLog(true);
        setUid(response_get.data[0].id_user);
        props.history.push('/home');
      }).catch(err => {
        console.log(err);
      })
  }

  const sendData = (e) => {
    e.preventDefault()

    if (!email.trim()) {
      setError('Introduce email')
      return
    }
    if (!password.trim()) {
      setError('Introduce contraseña')
      return
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }
    setError(null)
    if (registro) {
      registrar(e)
    } else {
      login(e)
    }
  };

  const login = useCallback(async (e) => {
    try {
      let res = await auth.signInWithEmailAndPassword(email, password)
      let response = await axios.get(`http://localhost:5000/api/login/${res.user.email}`)
      setEmail("");
      setPassword("");
      setError(null);
      setitsLog(true);
      setUid(response.data[0].id_user)
      props.history.push('/home')
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setError('Email no válido')
      }
      if (error.code === 'auth/user-not-found') {
        setError('Email no registrado')
      }
      if (error.code === 'auth/wrong-password') {
        setError('Contraseña errónea')
      }
    }
  }, [email, password, props.history, setUid, setitsLog]);

  const registrar = useCallback(async (e) => {
    try {
      let img
      console.log(image.image);
      if (image.image === undefined) {
        img = null
      } else {
        img = URL.createObjectURL(image.image)
      }
      const res = await auth.createUserWithEmailAndPassword(email, password)

      let emailForm = e.target.email.value;
      let uidForm = res.user.uid
      let username = e.target.username.value;
      let user = {
        uidForm,
        img,
        emailForm,
        username
      }
      let response = await axios.post(`http://localhost:5000/api/register`, user)
      console.log(response);
      await db.collection('usuarios').doc(res.user.uid).set({
        email: res.user.email,
        uid: res.user.uid,
      }); //colección usuarios
      let respose_get = await axios.get(`http://localhost:5000/api/login/${res.user.email}`)
      setEmail("");
      setPassword("");
      setError(null);
      setitsLog(true);
      setUid(respose_get.data[0].id_user);
      props.history.push('/home');
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/invalid-email') {
        setError('Email no válido')
      }
      if (error.code === 'auth/email-already-in-use') {
        setError('El email ya existe')
      }
    }
  }, [email, password, props.history, image.image, setUid, setitsLog]);

  const handleImage = (e) => {
    if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/jpg') {
      setImage({ image: e.target.files[0] })
    }
  }



  

  return (
  
  <div className="mt-5">
    <Navbar />
    <h3 className="text-center">

    {registro ? "Registro de usuario" : "Login"}

    </h3>
    <hr />
    <div className="row justify-content-center">
      <div className="col-12 col-sm-8 col-md-6 col-xl-4">
        <form onSubmit={sendData}>
          {
            error ? (
              <div className="alert alert-danger">
                {error}
              </div>
            ) : null
          }
          <input 
          type="email" 
          className="form-control mb-3" 
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          value={email}/>
          <input 
          
          type="password" 
          autoComplete="current-password"
          className="form-control mb-4" 
          placeholder="Contraseña" 
          onChange={e => setPassword(e.target.value)}
          value={password}/>
         
          {/* <input type="text"
          className="form-control mb-4" 
          placeholder="Nombre"
          onChange={e => setDisplayName(e.target.value)}
          value={displayName}
          /> */}
         
          <button className="btn btn-dark btn-lg col-12 mb-2" type="submit">
            
          {
            registro ? "Registrarse" : "Acceder"
          }

          </button>
          <button 
          className="btn btn-info btn-sm col-12"
          type="button"
          onClick={()=> setRegistro(!registro)}>
            
          {
            registro ? "¿Ya estás registrado?" : "¿No tienes cuenta?"
          }

          </button>
          <button 
          className="btn btn-info btn-sm col-12 mt-3"
          type="button"
          onClick={()=> loginGoogle(registro)}>
            
          {
            registro ? "Regitro con Google" : "Registro con Google"
          }

          </button>

          
          {
            !registro ? (
            <button 
            className="btn btn-danger btn-lg col-12 mt-4" 
            type="button" 
            onClick={()=> props.history.push('/reset')}>
            Recuperar contraseña

    <div className="mt-5">
      <h3 className="text-center">
        {registro ? "Registro de usuario" : "Login"}
      </h3>
      <hr />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
          <form onSubmit={sendData}>
            {
              error ? (
                <div className="alert alert-danger">
                  {error}
                </div>
              ) : null
            }
            <input
              type="email"
              className="form-control mb-3"
              name='email'
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
              value={email} />
            <input

              type="password"
              className="form-control mb-4"
              placeholder="Contraseña"
              onChange={e => setPassword(e.target.value)}
              value={password} />
            {registro === true ? (
              <>
                <input type='text' name='username' placeholder='Username' className='form-control mb-3' />
                <input type="file" name='files' onChange={handleImage} />
              </>
            ) : ''}
            <button className="btn btn-dark btn-lg col-12 mb-2" type="submit">

              {
                registro ? "Registrarse" : "Acceder"
              }

            </button>
            <button
              className="btn btn-info btn-sm col-12"
              type="button"
              onClick={() => setRegistro(!registro)}>

              {
                registro ? "¿Ya estás registrado?" : "¿No tienes cuenta?"
              }


            </button>
            <button
              className="btn btn-info btn-sm col-12 mt-3"
              type="button"
              onClick={() => loginGoogle(registro)}>

              {
                registro ? "Regitro con Google" : "Registro con Google"
              }

            </button>


            {
              !registro ? (
                <button
                  className="btn btn-danger btn-lg col-12 mt-4"
                  type="button"
                  onClick={() => props.history.push('/reset')}>
                  Recuperar contraseña
                </button>

              ) : null
            }


          </form>
        </div>
      </div>

    </div>
  )
};

export default withRouter(Login);
