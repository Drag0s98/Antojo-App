//External imports
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios_hook from './hooks/get-axios';

//Personal imports
import { DataContext } from './context/context'
import './styles/styles.scss'
import Main from './components/Main';

function App() {

  const [itsLog, setitsLog] = useState(false);
  const [uid, setUid] = useState(null);
  const [myGeolocation, setmyGeolocation] = useState(null);
  const [orders, setOrders] = useState(null)
  const [confirmed, setConfirmed] = useState(null);
  const contextObj = { //Hago un objeto para pasarselo por provider a los hijos
  itsLog, setitsLog, uid, setUid, myGeolocation, setmyGeolocation, orders, setOrders, confirmed, setConfirmed

  }

  const { loading } = axios_hook(`http://localhost:5000/api/restaurants`);
 


  return (
    <div className="container">
      <BrowserRouter>
        {loading === false ? <DataContext.Provider value={contextObj}>
          <Main />
        </DataContext.Provider> : ''}
      </BrowserRouter>
  
    </div>
  );
}

export default App;
