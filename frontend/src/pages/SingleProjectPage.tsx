import { useEffect, useState } from "react"
import { getDashStats } from "../api/project.api";
import { useParams } from "react-router";
import StateCard from "../components/StateCard";
import Navbar from "../components/Navbar";
import { getTeam } from "../api/team.api";

export default function SingleProjectPage(){
    const {teamId, projectId} = useParams();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [team, setTeam] = useState<any>(null);


    const currentTeamHandler = async () => {
        const response = await getTeam(teamId as string);
        if(response.success){
            setTeam(response.data);
        }
    }
    
    useEffect(() => {
        setLoading(true);
        getDashStats(teamId as string, projectId as string).then(setStats);
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
    return (
        <div>
            <Navbar teamName={team.name} heading="Projects" subLine="Work on all your projects"/>
            <div className="m-5 flex justify-evenly">
                <StateCard title="Number of Sprints" value={stats.numSprints} />
                <StateCard title="Number of Tasks" value={stats.numTasks} />
            </div>
            <div>
                <button>Create Sprint</button>
            </div>
        </div>
    )
}