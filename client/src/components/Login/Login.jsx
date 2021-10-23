import React, { useState, useCallback, useContext } from "react";
import { auth, db, google } from "../../firebase";
import { withRouter } from "react-router";
import axios from 'axios'
import { DataContext } from "../../context/context";


const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("")
  const [image, setImage] = useState('');
  const [nose, setNose] = useState(null);
  const [error, setError] = useState(null);
  const [registro, setRegistro] = useState(true);
  const { itsLog, setitsLog, uid, setUid } = useContext(DataContext)



  const loginGoogle = () => {
    auth.signInWithPopup(google)
      .then(res => {
        console.log(res);
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
      login()
    }
  };

  const login = useCallback(async () => {
    try {
      let res = await auth.signInWithEmailAndPassword(email, password)
      setEmail("");
      setPassword("");
      setError(null);
      setitsLog(true);
      setUid(res.user.uid)
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
      const res = await auth.createUserWithEmailAndPassword(email, password)
      const uidForm = res.user.uid
      const img = URL.createObjectURL(image.image)
      const username = e.target.username.value;
      await axios.post(`http://localhost:5000/api/register`, {
        img: img,
        username: username,
        uid: uidForm
      })
      await db.collection('usuarios').doc(res.user.uid).set({
        email: res.user.email,
        uid: res.user.uid,
      }); //colección usuarios
      setEmail("");
      setPassword("");
      setError(null);
      setitsLog(true);
      setUid(uidForm);
      props.history.push('/home');
    } catch (error) {
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
