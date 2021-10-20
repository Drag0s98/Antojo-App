import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';


import { DataContext } from './context/context'
import axios_hook from './hooks/get-axios'
import './styles/styles.scss'
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

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
    <div className="App">
      <BrowserRouter>
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
