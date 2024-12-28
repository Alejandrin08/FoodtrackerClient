import api from "./api";

export const registerClient = async (id, name, phone) => {
    try {
        const response = await api.post(`/client/${id}`, { name, phone });
        return response.data;
    } catch (error) {
        throw new Error("Error en el registro");
    }
};
