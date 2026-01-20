import { createContext, useContext, useEffect, useState } from "react";
import { getMe, login, signup } from "../api/auth.api";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({children} : {children : React.ReactNode}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token && !user){
            getMe().then((currentUser) => setUser(currentUser)).catch(() => {
                LogOut();
            })
        }
    },[])

    const SignUp = async (data : any) => {
       return await signup(data);
    } 
    const LogIn = async (data : any) => {
        const response = await login(data);
        if(!response.success){
            return response;
        }
        else{
            localStorage.setItem("token", response.data.token);
            const currentUser = await getMe();
            setUser(currentUser);
            return response;
        }
        
    }
    const LogOut = () => {
        setUser(null);
        localStorage.removeItem("token");
    }
    return(
        <AuthContext.Provider value = {{SignUp, LogIn, LogOut, user}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);
