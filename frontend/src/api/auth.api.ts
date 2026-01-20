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