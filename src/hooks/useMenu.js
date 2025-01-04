import { useState, useEffect } from "react";
import { getAllMenu } from "../services/menuService";

const useMenu = (restaurantName) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const fetchMenus = async () => {
            setLoading(true);
            setError(null);

            try{
                let data;
                data = await getAllMenu(restaurantName);
                setMenu(data);
            }catch (err) {
                setError(err.message);
            }finally {
                setLoading(false);
            }
        };
        fetchMenus();

    }, [restaurantName]);

    return {loading, error, menu};

};

export default useMenu;