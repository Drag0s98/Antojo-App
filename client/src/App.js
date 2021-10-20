import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './styles/styles.scss'

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import {auth} from './firebase'
import React from 'react';
import Reset from './components/Reset/Reset';

function App() {

  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user) {
        setFirebaseUser(user)
      } else {
        setFirebaseUser(null)
      }
    })
  }, [])


  return firebaseUser !== false ? (
    <div className="container">
      <BrowserRouter>
        <Navbar firebaseUser={firebaseUser}/>
        <Switch>
          <Route path="/" exact>
            <Home />
            </Route>
            <Route path='/login'>
              <Login />
              </Route>
              <Route path='/reset'>
              <Reset />
              </Route>
             <Header />
             <Main />

        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  ) : (
    <p>Cargando...</p>
  )
}

export default App;
