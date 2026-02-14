import { useState } from "react"
import { useNavigate, useParams } from "react-router";
import { createSprints } from "../api/sprint.api";


export default function CreateSprint(){
    const {projectId, teamId} = useParams();
    const navigate = useNavigate();
    const now = new Date();
    const [name, setName] = useState("");
    const [endDate, setEndDate] = useState<Date>(now);
    const [startedAt, setStartedAt] = useState<Date>(now);

    const createhandler = async () => {
        await createSprints(projectId as string, {
            name : name,
            endDate : endDate,
            startedAt : startedAt
        });
        navigate(`/dashboard/teams/${teamId}/projects/${projectId}`);
    }

    return (
        <div className="flex-1 flex items-center justify-center bg-slate-900 text-slate-200 p-8">
    
            <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-8 w-full max-w-md space-y-6">

                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-slate-400 font-medium">
                        Sprint Name
                    </label>
                    <input 
                        type="text" 
                        className="bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-slate-400 font-medium">
                        Start Date
                    </label>
                    <input 
                        type="date" 
                        className="bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => {
                            const date = new Date(e.target.value);
                            setStartedAt(date);
                        }}
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-slate-400 font-medium">
                        End Date
                    </label>
                    <input 
                        type="date" 
                        className="bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => {
                            const date = new Date(e.target.value);
                            setEndDate(date);
                        }}
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