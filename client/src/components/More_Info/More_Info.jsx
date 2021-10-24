import React from 'react';
import { useParams } from 'react-router';


// el coponente es More_Info , y recoge los props por location.state. Tienes un context en el padre que guarda todos los restarantes , tendras que hacerlo por peticiones a la base de datos, creo que la query esta echa, si no la puedes hacer sin problema.

function More_Info({ location }) {

    //fetch id  platos
    //fetch restaurantes con ese plato

    console.log(location);

    return (
        <>
        <div className="tgview">
             <h3 className="tituloview"></h3>
             
        
             
        </div>
          
         </>
    )
}

export default More_Info;
