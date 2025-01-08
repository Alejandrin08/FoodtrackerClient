import { useState } from "react";
import { deleteDish, editDish } from "../services/menuService";

const useEditMenu = () => {
    const [loading, setLoading] = useState(false);

    const deleteDishFromMenu = async (dishName) => {
        setLoading(true);
        try {
            await deleteDish(dishName);
            return { success: true };
        } catch (err) {
            console.error(err.message || "Error al eliminar el platillo");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    const editDishFromMenu = async (dishName, dishData) => {
        setLoading(true);

        try {
            await editDish(dishName, dishData);

            return { success: true };
        } catch (err) {
            console.error(err.message || "Error al editar el platillo");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { loading, deleteDishFromMenu, editDishFromMenu };
};

export default useEditMenu;
