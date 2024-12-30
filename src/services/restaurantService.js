import api from "./api";

export const getAllRestaurants = async () => {
    try {
        const response = await api.get("/restaurant/");
        return response.data;
    } catch (error) {
        throw new Error("Error al obtener los restaurantes");
    }
};

export const getRestaurantsByCategory = async (category) => {
    try {
        const response = await api.get(`/restaurant/?categoryName=${category}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error al obtener restaurantes de la categoría ${category}`);
    }
};
