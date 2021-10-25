import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Browser = () => {

  let history = useHistory();


  //Genero los estados necesarios para el funcionamiento de la busqueda
  const [dishes, setDishes] = useState(null);
  const [searchValue, setSearchValue] = useState('') //Guardo los valores de la busqueda

  //Al inicio de la aplicacion seteo los platos en otro estado
  useEffect(() => {
    axios.get(`http://localhost:5000/api/dishes`)
      .then(res => setDishes(res.data))
  }, [])

  //Al clickar en el boton digo que se esta buscando y le pongo un timer para controlar la asincronia de la aplicacion y que no suelte errores a la hora de imprimir
  const handleSubmit = async (event) => {
    event.preventDefault()
    filter(event.target.browser.value)
  }
  //Creo un filtro por nombre de plato para el input
  const filter = async (inputSearch) => {
    let filterSearch = await dishes.filter((element) => {
      if (element.name.includes(inputSearch.toLowerCase())) {
        return element;
      } else {
        return null;
      }
    })
    setSearchValue(...searchValue, filterSearch)
  }
  const healthyFilter = async (e) => {
    switch (e.target.value) {
      case 'healthy':
        console.log('push');
        history.push('/category', { filter: 'Healthy' })
        break;
      case 'vegan':
        history.push('/category', { filter: 'Vegan' })
        break;
      case 'vegetarian':
        history.push('/category', { filter: 'Vegetarian' })
        break;
      default:
        break;
    }
  }

  if (searchValue !== '') history.push('/search', searchValue)


  return (
    <section className='browserBox'>
      <h1>Bienvenido a Antojo!</h1>
      <form onSubmit={handleSubmit}>
        <label>Introduce una busca</label>
        <br />
        <input type="text" name="browser" placeholder='hamburguesa' />
        <button>Search</button>
      </form>
      <button value='healthy' onClick={healthyFilter}>Healthy</button>
      <button value='vegan' onClick={healthyFilter}>Vegan</button>
      <button value='vegetarian' onClick={healthyFilter} >Vegetarian</button>
    </section>
  );
};
export default Browser;