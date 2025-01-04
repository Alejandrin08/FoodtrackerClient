import { useState } from "react";
import { registerRestaurant, getAllRestaurantsLocation } from "../services/restaurantService";

const useRegisterRestaurant = () => {
    const [loading, setLoading] = useState(false);

    const register = async (restaurantData) => {
        setLoading(true);

        try {
            const { restaurant, newToken } = await registerRestaurant(restaurantData);

            localStorage.setItem("authToken", newToken);

            return { success: true, restaurant };
        } catch (err) {
            console.error(err.message || "Error al registrar el restaurante");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    const getAllLocation = async () => {
        setLoading(true);

        try {
            const locations = await getAllRestaurantsLocation(); 

            return { success: true, locations };
        } catch (err) {
            return { success: false };
        } finally {
            setLoading(false);
        }
    }

    return { loading, register, getAllLocation };
};

export default useRegisterRestaurant;
