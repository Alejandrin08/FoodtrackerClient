import api from "./api";

export const login = async (email, password) => {
    try {
        const response = await api.post("/account/login", { email, password });
        return response.data;
    } catch (error) {
        throw new Error("Credenciales incorrectas");
    }
};

export const register = async (email, password) => {
    try {
        const response = await api.post("/account/", { email, password, accountType: "CLIENT" });
        return response.data;
    } catch (error) {
        throw new Error("Error en el registro");
    }
};

export const validateEmail = async (email) => {
    try {
        const response = await api.get(`/account/email/${email}`);
        return response.data;
    } catch (error) {
        throw new Error("Error al validar el correo");
    }
};

export const updatePassword = async (email, password) => {
    try {
        const response = await api.put("/account/", { email, password });
        return response.data;
    } catch (error) {
        throw new Error("Error al actualizar la contraseña");
    }
};

export const updateEmail = async (id, newEmail) => {
    try {
        const response = await api.put(`/account/${id}`, { newEmail });
        return response.data;
    } catch (error) {
        throw new Error("Error al actualizar el correo");
    }
}