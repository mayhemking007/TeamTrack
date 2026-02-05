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
        <div>
            <Navbar teamName={team.name} heading="Home" subLine="Monitor all your work here"/>
            <div className="m-5 flex justify-between">
                <StateCard title="Total Projects" value={stats.numProjects} />
                <StateCard title="Total Tasks" value={stats.numAllTasks} />
                <StateCard title="Assigned Tasks" value={stats.numMyTasks} />
                <StateCard title="Completed Tasks" value={stats.numDoneTasks} />
            </div>
            <div className="flex justify-between mx-20 mt-5">
                <div className="border-1 w-120 h-60 mt-25 ml-15 p-4 rounded-lg">
                    <h3>Assigned Tasks</h3>
                    {
                        assignTasks.map((t : any) => (
                            <div key={t._id} className="flex justify-evenly bg-gray-200 border-1 rounded-sm">
                                <NavLink to={`/dashboard/teams/${team._id}/tasks/${t._id}`}>{t.title}</NavLink>
                                <p>{t.priority}</p>
                            </div>
                        ))
                    }
                    <div className="w-full bg-blue-200 px-2 py-1 mt-20 rounded-md flex justify-center items-center">
                        <NavLink  to={`/dashboard/teams/${team._id}/task`}>Show All Tasks</NavLink>
                    </div>
                    
                </div>
                <div className="border-1 w-120 mt-25 ml-15 p-4">
                    <h3>Projects</h3>
                    {
                        projects.map((pro : any) => (
                            <div key={pro._id} className="w-80 h-20 m-10 mb-8 border rounded-xl shadow-lg px-5 py-5 flex items-center justify-center">
                                <NavLink key={pro._id} to={`/dashboard/teams/${team._id}/projects/${pro._id}`}>{pro.name}</NavLink>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="flex flex-col border-1 w-260 mt-10 ml-40 p-4" >
                <h3>Team Members</h3>
                {
                    teamMembers.map((tm: any) => (
                        <div key={tm._id} className="shadow-lg bg-gray-200 w-50 h-20 flex justify-center items-center">
                            <h3>{tm.userId.name}</h3>
                        </div>
                    ))
                }
            </div>
            
        </div>
    )
}