import { useState } from "react";
import { registerRestaurant, getAllRestaurantsLocation, getRestaurantOwner, updateRestaurantOwner } from "../services/restaurantService";

const useRegisterRestaurant = () => {
    const [loading, setLoading] = useState(false);

    const register = async (restaurantData) => {
        setLoading(true);

        try {
            const { restaurant, newToken } = await registerRestaurant(restaurantData);

            localStorage.setItem("authToken", newToken);

            return { success: true, restaurant };
        } catch (err) {
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
    };

    const getRestaurant = async () => {
        setLoading(true);

        try {
            const restaurant = await getRestaurantOwner();

            return { success: true, restaurant };
        } catch (err) {
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    const updateRestaurant = async (restaurantData) => {
        setLoading(true);

        try {
            const restaurant = await updateRestaurantOwner(restaurantData);
            return { success: true, restaurant };
        } catch (err) {
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { loading, register, getAllLocation, getRestaurant, updateRestaurant };
};

export default useRegisterRestaurant;
