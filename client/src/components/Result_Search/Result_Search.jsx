import React, { useState, useEffect } from 'react'
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

    const [byCategory, setByCategory] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target.browser.value);
        let res = axios.get(``)
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
            new Promise(resolve => setTimeout(resolve, 500))
                .then(() => {
                    restaurants.map((param) => {
                        let arr = param.coordinates.split(',');
                        let lat = parseFloat(arr[0])
                        let lon = parseFloat(arr[1])
                        let obj = {
                            name: param.name,
                            lat: lat,
                            lon: lon
                        }
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
            new Promise(resolve => setTimeout(resolve, 600))
                .then(() => {
                    order.filter((element, i) => {
                        arr.push(element.distance)
                        arr.sort((a, b) => a - b)
                        if (arr[i] === element.distance) {
                            return element
                        }
                    })
                })

        }
    }, [order])

    return (
        
        <section className="result">
            <article className="result--box-input">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="browser" placeholder='Busca plato...' />
                    <button>Search</button>
                </form>
            </article>
            <br />
            <article className="list">
                {order !== null ? order.map((param, i) => {
                    return (
                        <div key={i}>
                            {/* Imagen Aquí */}
                            <h3>{location.state[0].name}</h3>
                            <h4>{param.name}</h4>
                            <h4>Precio</h4>
                            <button  onClick={() => history.push('/more', {
                                dish: location.state[0],
                                restaurant: param.name
                            })}>Más detalles</button>
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
