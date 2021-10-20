import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './styles/styles.scss'

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import React from 'react';
import Reset from './components/Reset/Reset';

function App() {


  return (
    <div className="container">
      <BrowserRouter>
        <Navbar/>
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
  );
}

export default App;
