import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router";
import { getTeam } from "../api/team.api";


export default function Dashboard(){
    const {teamId} = useParams();
    const [team, setTeam] = useState(null);

    const currentTeam = async () => {
        const response = await getTeam(teamId as string);
        if(response.success){
            console.log(response);
            setTeam(response.data);
        }
        else{
            console.log("fails");
        }
        
    }
    useEffect(() => {
        if(!teamId) return;
        currentTeam();
    },[teamId]);
    if(!team){
        return;
    }
    return (
        <div className="flex">
            <Sidebar team={team} />
            <main>
                <Outlet context={{team}}/>
            </main>
            
        </div>
    )
}