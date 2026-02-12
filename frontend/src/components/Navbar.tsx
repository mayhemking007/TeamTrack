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
        <div className="h-20 flex items-center justify-between px-8 bg-slate-900 border-b border-slate-700 text-slate-200">
    
            <div>
                <h1 className="font-semibold text-2xl text-white tracking-tight">
                    {props.heading}
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                    {props.subLine}
                </p>
            </div>

            <div className="flex items-center gap-8 text-sm font-medium">
                <div className="px-3 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300">
                    {props.teamName}
                </div>

                <div className="px-3 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300">
                    {user.name}
                </div>

                <div>
                    <button
                        onClick={logoutHandler}
                        className="px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white transition cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>

    )
}