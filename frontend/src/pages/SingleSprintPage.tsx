import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router";
import { getSprintStats } from "../api/sprint.api";
import StateCard from "../components/StateCard";

export default function SingleSprintPage(){
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const {sprintId, teamId} = useParams();
    
    useEffect(() => {
        setLoading(true);
        getSprintStats(sprintId as string).then(setStats);
        setLoading(false);
    }, [sprintId]);
    if(loading){
        return (
            <div>Loading....</div>
        )
    }
    if(!stats){
        return <div>No stats</div>
    }
    return (
        <div className="flex-1 flex flex-col bg-slate-900 text-slate-200 p-8 space-y-10">

          
            <div className="grid grid-cols-2 gap-8">
                <StateCard value={stats.numTasks} title="Tasks in the Sprint" />
                <StateCard value={stats.numAssignedTasks} title="Assigned Tasks in the Sprint." />
            </div>

          
            <div className="flex justify-end">
                <NavLink 
                    to={`/dashboard/teams/${teamId}/sprints/${sprintId}/tasks/new`}
                    className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md transition"
                >
                    Create Tasks
                </NavLink>
            </div>

        </div>

    )
}