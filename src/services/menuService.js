import api from "./api";

export const getAllMenu = async (restaurantName) => {
    try {
        const response = await api.get(`/menu/?restaurantName=${restaurantName}`);
        return response.data;
    }catch(error){
        throw new Error (`Error al obtener el menu de ${restaurantName}`);
    }
};