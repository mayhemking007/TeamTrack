import { useEffect, useState } from "react"
import { getDashStats } from "../api/project.api";
import { NavLink, useParams } from "react-router";
import StateCard from "../components/StateCard";
import Navbar from "../components/Navbar";
import { getTeam } from "../api/team.api";
import { getSprints } from "../api/sprint.api";

export default function SingleProjectPage(){
    const {teamId, projectId} = useParams();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [team, setTeam] = useState<any>(null);
    const [sprints, setSprints] = useState<any>(null);


    const currentTeamHandler = async () => {
        const response = await getTeam(teamId as string);
        if(response.success){
            setTeam(response.data);
        }
    }
    
    useEffect(() => {
        setLoading(true);
        getDashStats(teamId as string, projectId as string).then(setStats);
        getSprints(projectId as string).then(setSprints);
        currentTeamHandler();
        setLoading(false);
        console.log(team);
    }, [teamId, projectId]);
    if(loading){
        return (
            <div>Loading....</div>
        )
    }
    if(!stats){
        return (
            <div>No Stats</div>
        )
    }
    if(!team){
        return (
            <div>No team</div>
        )
    }
    if(!sprints){
        return (
            <div>No Sprints</div>
        )
    }
    return (
        <div className="flex-1 flex flex-col bg-slate-900 text-slate-200">
    
            <Navbar teamName={team.name} heading="Project" subLine="Manage all your project Sprints here."/>

            <div className="p-8 space-y-10">

              
                <div className="grid grid-cols-2 gap-8">
                    <StateCard title="Number of Sprints" value={stats.numSprints} />
                    <StateCard title="Number of Tasks" value={stats.numTasks} />
                </div>

                <div className="flex justify-end">
                    <NavLink 
                        to={`/dashboard/teams/${teamId}/projects/${projectId}/sprints/new`}
                        className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md transition"
                    >
                        Create Sprint
                    </NavLink>
                </div>
                
                <div className="grid grid-cols-3 gap-8">
                    {
                        sprints.map((sp : any) => (
                            <div 
                                key={sp._id} 
                                className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg px-6 py-6 flex items-center justify-center hover:bg-slate-700 transition"
                            >
                                <NavLink 
                                    to={`/dashboard/teams/${teamId}/projects/${projectId}/sprints/${sp._id}`}
                                    className="font-medium hover:text-indigo-400 transition"
                                >
                                    {sp.name}
                                </NavLink>
                            </div>
                        ))
                    }
                </div>

               
               

            </div>

        </div>

    )
}