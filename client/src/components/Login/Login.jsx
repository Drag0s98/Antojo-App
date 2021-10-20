import { async } from "@firebase/util";
import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { auth, db, google } from "../../firebase";
import { withRouter } from "react-router";


const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("")

  const [error, setError] = useState(null);

  const [registro, setRegistro] = useState(true);

  const loginGoogle = () => {
    auth.signInWithPopup(google)
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
  }

  const sendData = (e) => {
    e.preventDefault()

    if(!email.trim()) {
      setError('Introduce email')
      return
    }
    if(!password.trim()) {
      setError('Introduce contraseña')
      return
    }

    if(password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }
    setError(null)

    if(registro) {
      registrar()
    } else {
      login()
    }
  }

  const login = useCallback(async() => {
    try {
      await auth.signInWithEmailAndPassword(email, password)
      setEmail("");
      setPassword("");
      setError(null);
      props.history.push('/')
    } catch (error) {
      if(error.code === 'auth/invalid-email') {
        setError('Email no válido')
      }
      if(error.code === 'auth/user-not-found') {
        setError('Email no registrado')
      }
      if(error.code === 'auth/wrong-password') {
        setError('Contraseña errónea')
      }
    }
  }, [email, password, props.history])

  const registrar = useCallback(async() => {

    try {
      const res = await auth.createUserWithEmailAndPassword(email, password)
      console.log(res);
      await db.collection('usuarios').doc(res.user.uid).set({
          email: res.user.email,
          uid: res.user.uid,
        

      }) //colección usuarios
      setEmail("");
      setPassword("");
      setError(null)
      props.history.push('/')
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setError('Email no válido')
      }
      if (error.code === 'auth/email-already-in-use') {
        setError('El email ya existe')
      }
    }

  }, [email, password, props.history])
  


  return (
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
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          value={email}/>
          <input 
          
          type="password" 
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
