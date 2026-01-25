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
        <div>
            <Navbar teamName={team.name} heading="Project" subLine="Manage all your project Sprints here."/>
            <div className="m-5 flex justify-evenly">
                <StateCard title="Number of Sprints" value={stats.numSprints} />
                <StateCard title="Number of Tasks" value={stats.numTasks} />
            </div>
            <div>
                {
                    sprints.map((sp : any) => (
                        <div key={sp._id} className="w-80 h-20 m-10 mb-8 border rounded-xl shadow-lg px-5 py-5 flex items-center justify-center">
                        <NavLink key={sp._id} to={`/dashboard/teams/${teamId}/projects/${projectId}/sprints/${sp._id}`}>{sp.name}</NavLink>
                        </div>
                    ))
                }
            </div>
            <div>
                <NavLink to={`/dashboard/teams/${teamId}/projects/${projectId}/sprints/new`} >Create Sprint</NavLink>
            </div>
        </div>
    )
}