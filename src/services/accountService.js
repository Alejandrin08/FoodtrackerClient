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
}