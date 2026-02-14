import { useState } from "react"
import { createTeam } from "../api/team.api";
import { useNavigate } from "react-router";

export default function CreateTeam(){
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const createhandler = async() => {
        const team = await createTeam({name : name});
        navigate(`/dashboard/teams/${team.data.id}/home`);
    }
    return (
       <div className="flex-1 flex items-center justify-center bg-slate-900 text-slate-200 p-8">
    
            <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-8 w-full max-w-md space-y-6">
                
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-slate-400 font-medium">
                        Team Name
                    </label>
                    <input 
                        type="text" 
                        className="bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <button 
                    onClick={createhandler}
                    className="w-full px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md transition"
                >
                    Create
                </button>

            </div>

        </div>

    )
}