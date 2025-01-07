import { useState } from "react";
import { registerRating } from "../services/restaurantService";

const useRating = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const registerRate = async (restaurantName, rate) => {
        setLoading(true);
        setError(null);

        try {
            const data = await registerRating(restaurantName, rate);
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };


    return { loading, error, registerRate };
};

export default useRating;