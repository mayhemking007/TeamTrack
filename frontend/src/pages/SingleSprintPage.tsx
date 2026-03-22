import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router";
import { getSprint, getSprintStats } from "../api/sprint.api";
import StateCard from "../components/StateCard";
import { getTasksFiltered } from "../api/task.api";
import Navbar from "../components/Navbar";
import { getTeam } from "../api/team.api";

export default function SingleSprintPage(){
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const {sprintId, teamId, projectId} = useParams();
    const [tasks, setTasks] = useState<any>([]);
    const [team, setTeam] = useState<any>(null);
    const [sprint, setSprint] = useState<any>(null);
    const fetchTasks = async() => {
        const response = await getTasksFiltered(teamId as string, projectId as string, sprintId as string, 1, 5, "");
        setTasks(response.data);
    }
    useEffect(() => {
        if(!teamId) return;
        setLoading(true);
        getTeam(teamId as string).then((res) => setTeam(res.data));
        getSprint(sprintId as string).then(setSprint);
        getSprintStats(sprintId as string, teamId as string).then(setStats);
        setLoading(false);
    }, [sprintId, teamId]);
    useEffect(() => {
        if(!teamId) return;
        setLoading(true);
        fetchTasks();
        setLoading(false);
    }, [sprintId, projectId, teamId])
    if(loading){
        return (
            <div>Loading....</div>
        )
    }
    if(!team){
        return (
            <div>No Team</div>
        )
    }
    if(!sprint){
        return (
            <div>No Sprint</div>
        )
    }
    if(!stats){
        return <div>No stats</div>
    }
    if(tasks.length === 0){
        return (<div className="text-white">No task</div>)
    }
    return (
        <div className="flex-1 flex flex-col bg-slate-900 text-slate-200 p-8 space-y-10">

           <Navbar teamName={team.name} heading={sprint.name} subLine="Manage all your project Sprints here."/>
           
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

            <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg divide-y divide-slate-700">
                <div className="grid grid-cols-3 items-center px-6 py-4 bg-slate-850 text-slate-300 font-semibold">
                            
                        <p className="font-medium">Task</p>
                        <p className="font-medium">Priority</p>
                        <p className="font-medium">AssignTo</p>
                </div>
                {
                     tasks.map((t : any) => (
                        <div key={t._id} className="grid grid-cols-3 items-center px-6 py-4 hover:bg-slate-700 transition">
                            <NavLink 
                                to={`/dashboard/teams/${teamId}/tasks/${t._id}`}
                                className="font-medium hover:text-indigo-400 transition"
                            >
                                {t.title}
                            </NavLink>
                            <p className="text-sm text-slate-300">{t.priority}</p>
                            <p className="text-sm text-slate-400">{t.assignedTo?.userId?.name}</p>
                        </div>
                    )) 
                }
            </div>


        </div>

    )
}