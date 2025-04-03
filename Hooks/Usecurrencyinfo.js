import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://open.er-api.com/v6/latest/${currency}`);
                const json = await res.json();
                setData(json.rates);
            } catch (error) {
                console.error("Error fetching currency data:", error);
            }
        };

        fetchData(); // Passing argument
    }, [currency]);

    return data;
}

export default useCurrencyInfo;
