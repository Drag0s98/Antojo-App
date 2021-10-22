import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Result_Search({ location }) {

    //Falta implementar el filto de ordenar por cercania 

    let history = useHistory();

    const [newSearch, setNewSearch] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target.browser.value);
        let res = axios.get(``)
    }

    const handleClick = async (e) => {
        let id_dish = e.target.attributes.value.value;

        history.push('/more', {id_dish: id_dish})
    }

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
                {location.state.map((param, i) => {
                    return (
                        <div key={i}>
                            <p>{param.name}</p>
                            <button onClick={handleClick} value={param.id_dish}>Mas informacion</button>
                        </div>
                    )
                })}
            </article>
        </section>
    )
}

export default Result_Search
