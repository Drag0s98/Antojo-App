import React, { useState, useCallback, useContext } from "react";
import { auth, db, google } from "../../firebase";
import { withRouter } from "react-router";
import axios from 'axios'
import { FcGoogle } from "react-icons/fc"; 
import warning from '../../styles/assets/img/png/warning.png'
import yameal from '../../styles/assets/img/svg/yameal-logo.svg'

import { DataContext } from "../../context/context";

import Header from '../Header/Header';

const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error_pass, setError_pass] = useState(null);
  const [error_email, setError_email] = useState(null);
  const [registro, setRegistro] = useState(true);
  const { setitsLog, setUid } = useContext(DataContext)


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
        setError_email(null);
        setError_pass(null);
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
      setError_email(' Introduce email')
      return
    }
    if (!password.trim()) {
      setError_pass(' Introduce contraseña')
      return
    }
    if (password.length < 6) {
      setError_pass(' La contraseña debe tener al menos 6 caracteres')
      return
    }
    setError_pass(null);
    setError_email(null);
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
      setError_email(null);
      setError_pass(null);
      setitsLog(true);
      setUid(response.data[0].id_user)
      props.history.push('/home')
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setError_email(' Email no válido')
      }
      if (error.code === 'auth/user-not-found') {
        setError_email(' Email no registrado')
      }
      if (error.code === 'auth/wrong-password') {
        setError_pass(' Contraseña errónea')
      }
    }
  }, [email, password, props.history, setUid, setitsLog]);

  const registrar = useCallback(async (e) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password)

      let emailForm = email;
      let uidForm = res.user.uid
      let user = {
        uidForm,
        emailForm,
      }
      await axios.post(`http://localhost:5000/api/register`, user)
      await db.collection('usuarios').doc(res.user.uid).set({
        email: res.user.email,
        uid: res.user.uid,
      }); //colección usuarios
      let respose_get = await axios.get(`http://localhost:5000/api/login/${res.user.email}`)
      setEmail("");
      setPassword("");
      setError_email(null);
      setError_pass(null);
      setitsLog(true);
      setUid(respose_get.data[0].id_user);
      props.history.push('/home');
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/invalid-email') {
        setError_email(' Email no válido')
      }
      if (error.code === 'auth/email-already-in-use') {
        setError_email(' El email ya existe')
      }
    }
  }, [email, password, props.history, setUid, setitsLog]);


  return (
    <section className='auth_container'>
      <img src={yameal} className="yameallg1" />
      <Header />
      {registro === true ? (
        <>

          <h3 className='auth_title'>
            {registro ? 'Registro' : 'Login'}
          </h3>
          <form onSubmit={sendData} className='form_auth'>
            <div className="form-floating mb-3">
              <input type="email" className="form-control"  placeholder="email" onChange={e => setEmail(e.target.value)} value={email} />
              <label >Email</label>
            </div>
            {
              error_email ? (
                <div>
                  <p className='error_msg'>
                    <img src={warning} alt="" />
                    {error_email}
                  </p>
                </div>
              ) : null
            }
            <div className="form-floating mb-3 second_inp">
              <input type="password" className="form-control"  placeholder="Contraseña" onChange={e => setPassword(e.target.value)} value={password} />
              <label >Contraseña</label>
            </div>
            {
              error_pass ? (
                <div>
                  <p className='error_msg'>
                    <img src={warning} alt="" />
                    {error_pass}
                  </p>
                </div>
              ) : null
            }



            <p className='answer_box' onClick={() => {
              setError_email(null);
              setError_pass(null);
              setRegistro(!registro)
            }


            
            }>¿Tienes cuenta? Inicia sesión {'\u00A0'}<u>aquí</u></p>
            <div className='buttons_container'>
              <button type="submit" className='auth_btn'>
                {
                  registro ? "Registro" : "Iniciar sesión"
                }
              </button>
              <FcGoogle className="google"/>
              <button
                type="button" className='google-btn'
                onClick={() => loginGoogle(registro)}>

                {
                  registro ? "Registro con Google" : "Registro con Google"
                }
              </button>
              {/* <button
                type="button" className='password-btn'
                onClick={() => props.history.push('/reset')}>
                Recuperar contraseña</button> */}
            </div>
          </form>
        </>
      ) : ''}
      {
        registro === false ? (
          <>
            <h3 className='auth_title'>
              {registro ? "Registro de usuario" : "Iniciar sesión"}
            </h3>
            <FcGoogle className="google"/>
            <form onSubmit={sendData} className='form_auth'>
              <div className="form-floating mb-3">
                <input type="email" className="form-control"  placeholder="email" onChange={e => setEmail(e.target.value)} value={email} />
                <label>Email</label>
              </div>
              {
                error_email ? (
                  <div>
                    <p className='error_msg'>
                      <img src={warning} alt="" />
                      {error_email}
                    </p>
                  </div>
                ) : null
              }
              <div className="form-floating mb-3 second_inp">
                <input type="password" className="form-control"  placeholder="Contraseña" onChange={e => setPassword(e.target.value)} value={password} />
                <label >Contraseña</label>
              </div>
              {
                error_email ? (
                  <div>
                    <p className='error_msg'>
                      <img src={warning} alt="" />
                      {error_email}
                    </p>
                  </div>
                ) : null
              }

              <p className='answer_box' onClick={() => {
                setError_email(null);
                setError_pass(null);
                setRegistro(!registro)
              }}>¿Aún no tienes cuenta? Regístrate {'\u00A0'}<u>aquí</u></p>
              <div className='buttons_container'>

                <button type="submit" className='auth_btn'>
                  {
                    registro ? "Registro" : "Iniciar sesión"
                  }
                </button>
                
                <button
                  type="button" className='google-btn'
                  onClick={() => loginGoogle(registro)}>
                   
                  {
                    registro ? "Identifícate con Google"  : "Identifícate con Google "
                  
                  }

                </button>
                {
                  !registro ? (
                    <button
                      type="button" className='password-btn'
                      onClick={() => props.history.push('/reset')}>
                      Recuperar contraseña
                    </button>

                  ) : null
                }
              </div>

            </form>
          </>
        ) : ''}
    </section>

  )
}
export default withRouter(Login);
