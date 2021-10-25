import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import More_Info from '../More_Info';


function Result_Search({ location }) {

    //Falta implementar el filto de ordenar por cercania 

    let history = useHistory();
    console.log(location.state.filter);

    const [newSearch, setNewSearch] = useState(null);
    

    const [byCategory, setByCategory] = useState(null);

    useEffect(() => {
       if(location.state.filter){
           axios.get(`http://localhost:5000/api/category/${location.state.filter}`)
           .then((res) => setByCategory(res.data))
       }
    }, [location.state.filter])


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target.browser.value);
        let res = axios.get(``)
    }

    const handleClick = async (e) => {
        let id_dish = e.target.attributes.value.value;
        history.push('/more', {id_dish: id_dish})
    }

//Calcular distancia
function getDistance(origin, destination) {
  
    const lat1 = toRadian(origin[0]);
    const lon1 = toRadian(origin[1]);
    const lat2 = toRadian(destination[0]);
    const lon2 = toRadian(destination[1]);

    const deltaLat = lat2 - lat1;
    const deltaLon = lon2 - lon1;

    let a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
    let c = 2 * Math.asin(Math.sqrt(a));
    let EARTH_RADIUS = 6371;
    
    return c * EARTH_RADIUS * 1000;
    }
  
    function toRadian(degree) {
        return degree*Math.PI/180;
    }
    
    const distance = getDistance([36.70971, -4.43404], [36.75066, -4.06265]) // [origen lat, origen lon],[destination lat, destination lon]
    console.log('Distancia entre los 2 puntos:'+ distance)

    return (
        <section>
            <article>
                <form onSubmit={handleSubmit}>
                    <label>Introduce una busca</label>
                    <br />
                    <input type="text" name="browser" placeholder='hamburguesa' />
                    <button>Search</button>
                </form>
            </article>
            <br />
            <article>

                            
                {location.state.length >= 1 ?
                    location.state.map((param, i) => {
                        return (
                            <div key={i}>
                                <p>{param.name}</p>
                                <button onClick={handleClick} value={param.id_dish}>Mas informacion</button>
                            </div>
                        )
                    }) : ''}
                {byCategory != null ? byCategory.map((param, i) => {
                    return (
                        <div key={i}>
                            <p>{param.name}</p>
                        </div>
                    )
                }) : ''}
            </article>
            
        </section>
    )
}

export default Result_Search
