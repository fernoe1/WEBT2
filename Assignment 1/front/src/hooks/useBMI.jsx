import { useState } from "react";

export const useBMI = () => {
    const [isCalculating, setIsCalculating] = useState(false);
    const [calculatingError, setCalculatingError] = useState(null);

    const calculateBMI = async (height, weight) => {
        setIsCalculating(true);
        setCalculatingError(null);

        try {
            const response = await fetch('http://localhost:3000/calculate-bmi', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ height, weight })
            });

            const json = await response.json();

            if (!response.ok) {
                setIsCalculating(false);
                setCalculatingError(json.error);

                return null;
            }

            setIsCalculating(false);

            return json;
        } catch (err) {
            setIsCalculating(false);
            setCalculatingError("Server not reachable");

            return null;
        }
    };

    return { calculateBMI, isCalculating, calculatingError };
};