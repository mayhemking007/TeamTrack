import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext"

interface NavbarProps {
    teamName : string,
    heading : string,
    subLine : string
}

export default function Navbar(props : NavbarProps){
    const {user, LogOut} = useAuth();
    const navigate = useNavigate();
    const logoutHandler = () => {
        LogOut();
        navigate("/login");
    }
    return(
        <div className=" h-20 flex justify-between gap-220 my-5 mx-5 ">
            <div>
                <h1 className="font-semibold text-xl">{props.heading}</h1>
                <p className="mt-3 font-normal text-md">{props.subLine}</p>
            </div>
            <div className="flex justify-evenly gap-10">
                <div>{props.teamName}</div>
                <div>{user.name}</div>
                <div>
                <button onClick={logoutHandler}>Logout</button>
                </div>
            </div>
        </div>
    )
}