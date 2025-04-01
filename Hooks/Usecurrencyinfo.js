import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchCurrencyRates = async () => {
            try {
                const response = await fetch(`https://open.er-api.com/v6/latest/${currency}`);
                const result = await response.json();
                
                if (result.rates) {
                    setData(result.rates);
                } else {
                    console.error("Invalid API response:", result);
                    setData(null);
                }
            } catch (error) {
                console.error("Error fetching currency data:", error);
                setData(null);
            }
        };

        fetchCurrencyRates();
    }, [currency]);

    return data;
}

export default useCurrencyInfo;
