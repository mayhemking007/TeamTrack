
import { useState } from "react";
import { createTeam } from "../api/team.api"
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function NoTeamPage(){
    const [teamName, setTeamName] = useState("");
    const { LogOut} = useAuth();
    const logoutHandler = () => {
        LogOut();
        navigate("/login");
    }
    const navigate = useNavigate();
    const creatTeamHandler = async() => {
        const response = await createTeam({name : teamName});
        if(response.success){
            const teamId = response.data.id;
            navigate(`/dashboard/teams/${teamId}`);
        }
        else{
            alert("Cannot create the team");
            return;
        }
    }
    return ( 
        <div className="flex-1 flex items-center justify-center bg-slate-900 text-slate-200 p-8">
            
            <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-8 w-full max-w-md space-y-6 text-center">

                <h2 className="text-xl font-semibold text-white">
                    You are not a member of any team.
                </h2>

                <div className="space-y-4">

                    <h1 className="text-lg font-medium text-slate-300">
                        Create Team
                    </h1>

                    <input 
                        type="text" 
                        id="name" 
                        onChange={(e) => setTeamName(e.target.value)} 
                        className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <button 
                        onClick={creatTeamHandler}
                        className="w-full px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md transition"
                    >
                        Create
                    </button>

                    <button 
                        onClick={logoutHandler}
                        className="w-full px-6 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-md transition"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </div>

    )
}