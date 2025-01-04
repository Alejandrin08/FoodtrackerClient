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