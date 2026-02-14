import { useEffect, useState } from "react"
import { createTask } from "../api/task.api";
import { useNavigate, useParams } from "react-router";
import { getTeamMember } from "../api/teamMember.api";

export default function CreateTask(){
    const {sprintId, teamId} = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [assignedTo, setAssignedTo] = useState<any>(null);
    const [assignedBy, setAssignedBy] = useState<any>(null);
    const [priority, setPriority] = useState("medium");
    const [teamMember, setTeamMember] = useState([]);

    const createhandler = async () => {
        await createTask({
            title : title,
            description : Description,
            assignedBy : assignedBy,
            assignedTo : assignedTo,
            priority : priority,
            sprintId : sprintId as string
        });
        navigate(-1);

    }
    
    useEffect(() => {
        getTeamMember(teamId as string).then(setTeamMember);
    }, [teamId]);

    return (
      <div className="flex-1 flex items-center justify-center bg-slate-900 text-slate-200 p-8">
    
            <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-8 w-full max-w-lg space-y-6">

                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-slate-400 font-medium">
                        Title
                    </label>
                    <input 
                        type="text" 
                        className="bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-slate-400 font-medium">
                        Description
                    </label>
                    <textarea 
                        className="bg-slate-700 border border-slate-600 rounded-md px-4 py-3 text-slate-200 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-slate-400 font-medium">
                        Assigned To
                    </label>
                    <select 
                        onChange={(e) => setAssignedTo(e.target.value || null)}
                        className="bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option>Select the team member</option>
                        {
                            teamMember.length === 0 ? <></> :
                            teamMember.map((mem : any) => (
                                <option value={mem._id} key={mem._id}>
                                    {mem.userId.name}
                                </option>
                            )) 
                        }
                    </select>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-slate-400 font-medium">
                        Assigned By
                    </label>
                    <select 
                        onChange={(e) => setAssignedBy(e.target.value)}
                        className="bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option>Select the team member</option>
                        {
                            teamMember.length === 0 ? <></> :
                            teamMember.map((mem : any) => (
                                <option value={mem._id} key={mem._id}>
                                    {mem.userId.name}
                                </option>
                            )) 
                        }
                    </select>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-slate-400 font-medium">
                        Priority
                    </label>
                    <select 
                        onChange={(e) => setPriority(e.target.value)}
                        className="bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
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