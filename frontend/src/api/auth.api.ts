import { authClient } from "./client";

export const signup = async (payload : {
    name : string,
    email : string,
    username : string,
    password : string
}) => {
    const response = await authClient.post("/auth/signup", payload);
    return response.data;
} 

export const login = async (payload : {
    username : string,
    password : string
}) => {
    const response = await authClient.post("/auth/login", payload);
    return response.data;
}

export const getMe = async () => {
    const response = await authClient.get("/auth/me");
    return response.data.data;
}