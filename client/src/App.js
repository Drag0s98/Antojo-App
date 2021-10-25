//External imports
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
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
  const [itsLog, setitsLog] = useState(false);
  const [uid, setUid] = useState(null);
  const [myGeolocation, setmyGeolocation] = useState(null);
  const [header, setHeader] = useState(true);


  const contextObj = { //Hago un objeto para pasarselo por provider a los hijos
    restaurants, setRestaurants, itsLog, setitsLog, uid, setUid, myGeolocation, setmyGeolocation, setHeader
  }

  const { loading, result } = axios_hook(`http://localhost:5000/api/restaurants`);
  //Utilizo un use efect para cuando cambie el loading del fetch introduzca su resultado en el estado padre
  useEffect(() => {
    setRestaurants(result)
  }, [loading, result])



  return (
    <div className="container">
      {header === true ? <Header /> : ''}
      <BrowserRouter>
        {loading === false ? <DataContext.Provider value={contextObj}>
          <Main />
        </DataContext.Provider> : ''}
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
