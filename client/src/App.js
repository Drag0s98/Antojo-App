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
