import axios from "axios";

export const authClient = axios.create({
    baseURL : 'http://localhost:3000'
});

authClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})
