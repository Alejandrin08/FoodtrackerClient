import api from "./api";

export const registerClient = async (id, name, phone) => {
    try {
        const response = await api.post(`/client/${id}`, { name, phone });
        return response.data;
    } catch (error) {
        throw new Error("Error en el registro");
    }
};

export const getClient = async (id) => {
    try {
        const response = await api.get(`/client/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Error al obtener el cliente");
    }
};

export const updateClient = async (id, name, phone) => {
    try {
        const response = await api.put(`/client/${id}`, { name, phone });
        return response.data;
    } catch (error) {
        throw new Error("Error al actualizar el cliente");
    }
};