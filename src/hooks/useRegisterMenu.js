import { useState } from "react";
import { registerDish } from "../services/menuService";

const useRegisterMenu = () => {
    const [loading, setLoading] = useState(false);
    const register = async (dishData) => {
        setLoading(true);

        try {
            const { dish } = await registerDish(dishData);
          
            return { success: true, dish };
        } catch (err) {
            console.error(err.message || "Error al registrar el menu");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { loading, register };
};

export default useRegisterMenu;
