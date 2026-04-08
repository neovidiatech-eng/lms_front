import api from "../lib/axios"
import { LoginInput } from "../lib/schemas/LoginSchema";
import { RegisterInput } from "../lib/schemas/RegisterSchema";

export const login = async (data: LoginInput) => {
    const response = await api.post("/auth/sign-in", data);
    return response.data;
}

export const googleLogin = async (data: { idToken: string, provider: string }) => {
    const response = await api.post("/auth/google-login", data);
    return response.data;
}

export const register = async (data: RegisterInput) => {
    const response = await api.post("/auth/sign-up", data);
    return response.data;
}