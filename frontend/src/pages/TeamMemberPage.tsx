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
        <div className="flex-1 flex flex-col bg-slate-900 text-slate-200">
    
            <Navbar teamName={team.name} heading="Team Members" subLine="All your team members"/>

            <div className="p-8">

                <div className="grid grid-cols-4 gap-8">
                    {
                        teamMembers.map((tm : any) => (
                        <div 
                                key={tm._id} 
                                className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg px-6 py-6 flex items-center justify-center hover:bg-slate-700 transition"
                            >
                                <h3 className="font-medium text-slate-200">
                                    {tm.userId.name}
                                </h3>
                            </div>
                        ))
                    }
                </div>

            </div>

        </div>

    )
}