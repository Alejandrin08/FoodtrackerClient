import { useState, useEffect } from "react";
import { getAllRestaurants, getRestaurantsByCategory, registerRestaurant } from "../services/restaurantService";

const useRestaurant = (selectedCategory) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            setLoading(true);
            setError(null);

            try {
                let data;
                if (selectedCategory) {
                    data = await getRestaurantsByCategory(selectedCategory);
                } else {
                    data = await getAllRestaurants();
                }
                setRestaurants(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, [selectedCategory]);

    return { loading, error, restaurants };
};

export default useRestaurant;
