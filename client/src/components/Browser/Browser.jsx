import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';


import { DataContext } from '../../context/context'


const Browser = () => {

  //Cojo los restaurantes que estan en el padre
  const { restaurants, setRestaurants } = useContext(DataContext);

  //Genero los estados necesarios para el funcionamiento de la busqueda
  const [dishes, setDishes] = useState(null);
  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState([])

  //Al inicio de la aplicacion seteo los platos en otro estado
  useEffect(() => {
    axios.get(`http://localhost:5000/api/dishes`)
      .then(res => setDishes(res.data))
  }, [])

  //Al clickar en el boton digo que se esta buscando y le pongo un timer para controlar la asincronia de la aplicacion y que no suelte errores a la hora de imprimir
  const handleSubmit = async (event) => {
    event.preventDefault()
    filter(event.target.browser.value)
    await new Promise(resolve => setTimeout(resolve, 500))
    setSearch(true)
  }
  //Si el input text esta vacio reseteo el estado de la busqueda y pongo el false la busqueda
  const handleChange = (e) => {
    if(e.target.value === ''){
      setSearchValue([])
      setSearch(false)
    }
  }

  //Creo un filtro por nombre de plato para el input
  const filter = async (inputSearch) => {
    let filterSearch = dishes.filter((element) => {
      if (element.name.includes(inputSearch.toLowerCase())) {
        return element;
      } else {
        return null;
      }
    })
    let arr = [] //Genero un array para ir pusheando lo que me suelta la api
    let res = await axios.get(`http://localhost:5000/api/dish/${filterSearch[0].name}`)
    res.data.map(async (param, i) => {
      let data = await axios.get(`http://localhost:5000/api/restaurants/${param.id_restaurant}`)
      arr.push(data.data[0])
    })
    setSearchValue([...searchValue, arr]);//Meto ese array en el estado
  }

  return (
    <section>
      <h1>Bienvenido a Antojo!</h1>
      <form onSubmit={handleSubmit}>
        <label>Introduce una busca</label>
        <br />
        <input type="text" name="browser" onChange={handleChange} placeholder='hamburguesa' />
        <button>Search</button>
      </form>
    </section>
  );
};
export default Browser;