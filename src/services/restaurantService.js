import api from "./api";

export const registerRestaurant = async (restaurantData) => {
    try {
        const response = await api.post("/restaurant/", restaurantData);
        return response.data;
    } catch (error) {
        throw new Error("Error al registrar el restaurante");
    }
};

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

export const getAllRestaurantsLocation = async () => {
    try {
        const response = await api.get("/restaurant/location");
        return response.data;
    } catch (error) {
        throw new Error("Error al obtener los restaurantes");
    }
<<<<<<< HEAD
};

export const getRestaurantOwner = async () => {
    try {
        const response = await api.get("/restaurant/owner");
        return response.data;
    } catch (error) {
        throw new Error("Error al obtener el restaurante");
    }
}

export const updateRestaurantOwner = async (restaurantData) => {
    try {
        const response = await api.put("/restaurant/", restaurantData);
        return response.data;
    } catch (error) {
        throw new Error("Error al actualizar el restaurante");
    }
}
=======
}

export const registerRating = async (restaurantName, rate) => {
    try{
        const response = await api.post(`/rating/${restaurantName}`, {rate});
        return response.data;
    }catch{
        throw new Error(`Error al registrar el rating de ${restaurantName}`)
    }
}

>>>>>>> PalomaBranch
