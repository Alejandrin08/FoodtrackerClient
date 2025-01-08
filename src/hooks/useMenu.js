import { useState, useEffect, useCallback } from "react";
import { getAllMenu, getRestaurantById } from "../services/menuService";

const useMenu = (restaurantId) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const fetchMenus = async () => {
            setLoading(true);
            setError(null);

            try {
                let data;
                data = await getAllMenu(restaurantId);
                setMenu(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMenus();

    }, [restaurantId]);

    

    const getDetailsRestaurant = useCallback( async () => {
        setLoading(true);
        setError(null);
    
        try {
          const restaurant = await getRestaurantById(restaurantId);
          return restaurant;
        } catch (err) {
          setError(err.message);
          return null;
        } finally {
          setLoading(false);
        }
      }, [restaurantId]);

    return { getDetailsRestaurant, loading, error, menu };

};

export default useMenu;