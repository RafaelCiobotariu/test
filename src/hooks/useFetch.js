import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then(res => {
                    if (!res.ok) {
                        throw Error('data did not fetch, either wrong URL, or data is empty')
                    }
                    return res.json();
                })
                .then((data) => {
                    setData(data);
                    setIsLoading(false);
                    setError(null);
                })
                .catch(err => {
                    setError(err.message)
                    setIsLoading(false);
                })
        }, 200)
    }, [url])

    return { data, isLoading, error }
}

export default useFetch;