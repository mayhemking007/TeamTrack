import { useEffect, useState } from "react"
import { useParams } from "react-router";
import { getSprintStats } from "../api/sprint.api";
import StateCard from "../components/StateCard";

export default function SingleSprintPage(){
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const {sprintId} = useParams();
    
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
        <div>
            <div className="m-5 flex justify-evenly">
                <StateCard value= {stats.numTasks} title ="Tasks in the Sprint" />
                <StateCard value= {stats.numAssignedTasks} title ="Assigned Tasks in the Sprint." />
            </div>
        </div>
    )
}