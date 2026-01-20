import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext"

export default function Dashboard(){
    const {user, LogOut} = useAuth();
    const navigate = useNavigate();
    const logoutHandler = () => {
        LogOut();
        navigate("/login");
    }
    return (
        <div>
            Hi {user?.name}

            <button onClick={logoutHandler}>Logout</button>
        </div>
    )
}