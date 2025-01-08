import api from "./api";

export const getAllMenu = async (restaurantName) => {
    try {
        const response = await api.get(`/menu/?restaurantName=${restaurantName}`);
        return response.data;
    }catch(error){
        throw new Error (`Error al obtener el menu de ${restaurantName}`);
    }
};

export const getRestaurantById = async (id) => {
    try {
        const response = await api.get(`/restaurant/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error al obtener los detalles del restaurante `);
    }
};

export const registerDish = async (dishData) => {
    try {
        const response = await api.post("/menu/", dishData);
        return response.data;
    } catch (error) {
        throw new Error("Error al registrar el menu");
    }
}

export const deleteDish = async(dish) =>{
    try {
        const response = await api.delete(`/menu/${dish}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error al eliminar el platillo: ${dish} `);
    }
}

export const editDish = async(dishName, dishData) => {
    try {
        const response = await api.put(`/menu/${dishName}`, dishData);
        return response.data;
    } catch (error) {
        throw new Error(`Error al edit el platillo: ${dishName} `);
    }
}