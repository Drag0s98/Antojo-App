//External imports
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios_hook from './hooks/get-axios';

//Personal imports
import { DataContext } from './context/context'
import './styles/styles.scss'
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
<<<<<<< HEAD
=======
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import React from 'react';
import Reset from './components/Reset/Reset';
import Chat from './components/Chat/Chat';
>>>>>>> parent of 1e5d418... componente erróneo


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
<<<<<<< HEAD
=======
      <Chat />
        <Navbar/>
>>>>>>> parent of 1e5d418... componente erróneo
      

       
           
              {loading === false? <DataContext.Provider value={contextObj}>
             <Header />
             <Main />
              </DataContext.Provider>: ''}
      
        {loading === false ? <DataContext.Provider value={contextObj}>
          <Header />
          <Main />
        </DataContext.Provider> : ''}

      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
