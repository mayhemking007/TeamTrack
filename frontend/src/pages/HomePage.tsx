import { NavLink, useOutletContext } from "react-router";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getDashState } from "../api/team.api";
import StateCard from "../components/StateCard";

type DashboardContext = {
    team : any
}

export default function HomePage(){
    const {team} = useOutletContext<DashboardContext>()
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if(!team._id) return;
        setLoading(true);
        getDashState(team._id).then(setStats);
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
            <div className="flex justify-between m-20">
                <div className="border-1 w-120 mt-25 ml-15 p-4">
                    <h3>Assigned Tasks</h3>
                    <div>
                        <NavLink to="" >Task-1</NavLink>
                    </div>
                </div>
                <div className="border-1 w-120 mt-25 ml-15 p-4">
                    <h3>Projects</h3>
                    <div>
                        <NavLink to="" >Project</NavLink>
                    </div>
                    <div>
                        <NavLink to="" >Project</NavLink>
                    </div>
                </div>

            </div>
            
        </div>
    )
}