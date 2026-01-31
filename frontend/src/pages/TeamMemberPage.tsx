import { useOutletContext } from "react-router";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getTeamMember } from "../api/teamMember.api";


type DashboardContext = {
    team : any
}

export default function TeamMemberPage(){
    const {team} = useOutletContext<DashboardContext>();
    const [teamMembers, setTeamMembers] = useState<any>([]);
    useEffect(() => {
        if(!team._id) return;
        getTeamMember(team._id).then(setTeamMembers);
    }, [team._id]);
    if(!team) return <div>No Team</div>
    return(
        <div>
            <Navbar teamName={team.name} heading="Team Members" subLine="All your team members"/>
            <div className="m-10 flex justify-evenly">
                {
                    teamMembers.map((tm : any) => (
                       <div key={tm._id} className="shadow-lg bg-gray-200 w-50 h-20 flex justify-center items-center">
                            <h3>{tm.userId.name}</h3>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}