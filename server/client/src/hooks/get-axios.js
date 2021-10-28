import { useEffect, useState } from "react";
import axios from "axios";


const useGet = (url) => {

    const [loading, setLoading] = useState(true)
    const [result, setResult] = useState([])

    useEffect(() => {
        try {
            axios.get(url)
                .then(response => {
                    setResult(response.data)
                    setLoading(false)
                })
        } catch (error) {
            console.log('Get petition error ==> ' + error);
        }
    }, [url])

    return { loading, result }
}

export default useGet;