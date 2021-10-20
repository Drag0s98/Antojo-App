//External imports
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

//Personal imports
import { DataContext } from './context/context'
import axios_hook from './hooks/get-axios'
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
  //Creo un estado en el padre para poder utilizarlo en los demas componentes
  const [restaurants, setRestaurants] = useState(null)

  const contextObj = { //Hago un objeto para pasarselo por provider a los hijos
    restaurants, setRestaurants
  }

  const { loading, result } = axios_hook(`http://localhost:5000/api/restaurants`);

  //Utilizo un use efect para cuando cambie el loading del fetch introduzca su resultado en el estado padre
  useEffect(() => {
    setRestaurants(result)
  }, [loading, result])


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
              {loading === false? <DataContext.Provider value={contextObj}>
             <Header />
             <Main />
              </DataContext.Provider>: ''}
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
