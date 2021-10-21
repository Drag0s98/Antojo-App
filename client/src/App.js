
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';


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
import Chat from './components/Chat/Chat';

function App() {

  const [restaurants, setRestaurants] = useState(null)

  const contextObj = {
    restaurants, setRestaurants
  }

  const { loading, result } = axios_hook(`http://localhost:5000/api/restaurants`);

  useEffect(() => {
    setRestaurants(result)
  }, [loading])


  return (
    <div className="container">
      <BrowserRouter>
      <Chat />
        <Navbar/>
      

       
           
              {loading === false? <DataContext.Provider value={contextObj}>
             <Header />
             <Main />
              </DataContext.Provider>: ''}
      
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
