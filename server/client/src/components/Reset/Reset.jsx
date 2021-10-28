import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { auth } from "../../firebase";
import { withRouter } from "react-router";


const Reset = (props) => {

  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const sendData = (e) => {
    e.preventDefault()

    if(!email.trim()) {
      setError('Introduce email')
      return
    }
    setError(null)
    recuperar()
  }

  const recuperar = useCallback(async() => {

    try {
      await auth.sendPasswordResetEmail(email);
      props.history.push('/login')
    } catch (error) {
        setError(error.message)
    }

  }, [email, props.history])

  return (
    <div className="mt-5">
    <h3 className="text-center">
    Recuperar Contraseña
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
         
          <button className="btn btn-dark btn-lg col-12 mb-2" type="submit">
            Reiniciar contraseña
          </button>
        </form>
      </div>
    </div>
  </div>
  )
};

export default withRouter(Reset);
