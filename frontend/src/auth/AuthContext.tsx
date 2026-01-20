import { createContext, useContext } from "react";
import { signup } from "../api/auth.api";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({children} : {children : React.ReactNode}) => {
    const SignUp = async (data : any) => {
       return await signup(data);
    } 
    return(
        <AuthContext.Provider value = {{SignUp}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);
