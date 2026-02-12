import { NavLink, useOutletContext } from "react-router";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getDashState } from "../api/team.api";
import StateCard from "../components/StateCard";
import { getProjects } from "../api/project.api";
import { getTeamMember } from "../api/teamMember.api";
import { getTasksFiltered } from "../api/task.api";

type DashboardContext = {
    team : any
}

export default function HomePage(){
    const {team} = useOutletContext<DashboardContext>()
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState<any>([])
    const [teamMembers, setTeamMember] = useState<any>([]);
    const [assignTasks, setAssignTasks] = useState<any>([]);

    const fetchAssignTasks = async () => {
        const res = await getTasksFiltered(team._id, "null", "null", 1, 5, "me");
        setAssignTasks(res.data);
    }

    useEffect(() => {
        if(!team._id) return;
        setLoading(true);
        getDashState(team._id).then(setStats);
        getProjects(team._id).then(setProjects);
        getTeamMember(team._id).then(setTeamMember);
        fetchAssignTasks();
        setLoading(false);
    }, [team._id]);
    if(loading){
        return <div>Loading....</div>
    }
    if(!stats){
        return <div>No stats</div>
    }
    return(
        <div className="flex-1 flex flex-col bg-slate-900 text-slate-200">
    
    <Navbar teamName={team.name} heading="Home" subLine="Monitor all your work here"/>

    <div className="p-8 space-y-10">

        <div className="grid grid-cols-4 gap-6">
            <StateCard title="Total Projects" value={stats.numProjects} />
            <StateCard title="Total Tasks" value={stats.numAllTasks} />
            <StateCard title="Assigned Tasks" value={stats.numMyTasks} />
            <StateCard title="Completed Tasks" value={stats.numDoneTasks} />
        </div>

      
        <div className="grid grid-cols-2 gap-8">

            <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-lg space-y-4">
                <h3 className="text-lg font-semibold text-white">Assigned Tasks</h3>

                {
                    assignTasks.map((t : any) => (
                        <div key={t._id} className="flex justify-between items-center bg-slate-700 border border-slate-600 px-4 py-2 rounded-md">
                            <NavLink 
                                to={`/dashboard/teams/${team._id}/tasks/${t._id}`}
                                className="hover:text-indigo-400 transition"
                            >
                                {t.title}
                            </NavLink>
                            <p className="text-sm text-slate-300">{t.priority}</p>
                        </div>
                    ))
                }

                <div className="mt-4">
                    <NavLink  
                        to={`/dashboard/teams/${team._id}/task`}
                        className="block text-center bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md transition"
                    >
                        Show All Tasks
                    </NavLink>
                </div>
            </div>


            <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-lg space-y-6">
                <h3 className="text-lg font-semibold text-white">Projects</h3>

                {
                    projects.map((pro : any) => (
                        <div 
                            key={pro._id} 
                            className="bg-slate-700 border border-slate-600 rounded-xl px-5 py-4 flex items-center justify-center hover:bg-slate-600 transition"
                        >
                            <NavLink 
                                to={`/dashboard/teams/${team._id}/projects/${pro._id}`}
                                className="hover:text-indigo-400 transition"
                            >
                                {pro.name}
                            </NavLink>
                        </div>
                    ))
                }
            </div>

        </div>


       
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-6">Team Members</h3>

            <div className="flex flex-wrap gap-6">
                {
                    teamMembers.map((tm: any) => (
                        <div 
                            key={tm._id} 
                            className="bg-slate-700 border border-slate-600 rounded-lg px-6 py-4 flex items-center justify-center hover:bg-slate-600 transition"
                        >
                            <h3 className="text-slate-200">{tm.userId.name}</h3>
                        </div>
                    ))
                }
            </div>
        </div>

    </div>

</div>

    )
}