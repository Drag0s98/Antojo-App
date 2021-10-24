import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { usePosition } from "../../hooks/usePosition";
import More_Info from '../More_Info';



function Result_Search({ location, watch, settings }) {


    //location.state saco la informacion del plato
    //Falta implementar el filto de ordenar por cercania 
    const { latitude, longitude } = usePosition(watch, settings);
    const [restaurants_id, setRestaurants_id] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [order, setOrder] = useState(null);
    const [coords, setCoords] = useState(null);
    let history = useHistory();

    const [newSearch, setNewSearch] = useState(null);
    

    const [byCategory, setByCategory] = useState(null);

    useEffect(() => {
        if (location.state.filter) {
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

        let a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
        let c = 2 * Math.asin(Math.sqrt(a));
        let EARTH_RADIUS = 6371;

        return c * EARTH_RADIUS * 1000;
    }

    function toRadian(degree) {
        return degree * Math.PI / 180;
    }


    useEffect(() => {
        if (location.state !== undefined) {
            location.state.map(async (param) => {
                return await axios.get(`http://localhost:5000/api/dish/${param.name}`)
                    .then((res) => {
                        let id = res.data.map((param) => {
                            return param.id_restaurant
                        })
                        setRestaurants_id(id)
                    }).catch(error => console.log(error))
            })
        }
    }, [location])

    useEffect(() => {
        let arr = []
        if (restaurants_id.length > 0) {
            restaurants_id.map(async (param, i) => {
                let response = await axios.get(`http://localhost:5000/api/restaurants/${param}`)
                arr.push(response.data[0])
            })
            setRestaurants(arr)
        }
    }, [restaurants_id])

    useEffect(() => {
        let array = []
        if (restaurants !== '') {
            new Promise(resolve => setTimeout(resolve, 100))
                .then(() => {
                    restaurants.map((param) => {
                        console.log(param);
                        let arr = param.coordinates.split(',');
                        let lat = parseFloat(arr[0])
                        let lon = parseFloat(arr[1])
                        console.log(lat, lon);
                        let obj = {
                            name: param.name,
                            lat: lat,
                            lon: lon
                        }
                        console.log(obj);
                        return array.push(obj)
                    })
                    setCoords(array)
                }).catch(error => console.log(error))
        } else {
            return null;
        }
    }, [restaurants])

    useEffect(() => {
        let arr = []
        if (coords != null) {
            coords.map((param) => {
                const distance = getDistance([latitude, longitude], [param.lat, param.lon]) // [origen lat, origen lon],[destination lat, destination lon]
                let obj = {
                    name: param.name,
                    distance: distance
                }
                arr.push(obj)
                setOrder(arr)
            })
        }
        // console.log('Distancia entre los 2 puntos:' + distance)
    }, [coords])

    useEffect(() => {
        let arr = []
        if (order != null) {
            new Promise(resolve => setTimeout(resolve, 200))
                .then(() => {
                    order.filter((element, i) => {
                        arr.push(element.distance)
                        arr.sort((a, b) => b - a)
                        if (arr[i] === element.distance) {
                            return element
                        }
                    })
                })

        }
    }, [order])

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
                {order !==  null ? order.map((param, i) => {
                    console.log(param);
                    return (
                        <div key={i}>
                            {location.state[0].name}
                            {param.name}
                            <button onClick={() => history.push('/more', param.name )}>Pedir!</button>
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
