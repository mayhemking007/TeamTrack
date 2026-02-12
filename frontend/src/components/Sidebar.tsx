import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { getTeams } from "../api/team.api";

interface teamInterface {
    team : any
}

export default function Sidebar(props : teamInterface){
    const [teamId, setTeamId] = useState<any>(null);
    const [teams, setTeams] = useState<any>(null);
    const navigate = useNavigate();
    useEffect(() => {
        if(!props.team._id) return;
        setTeamId(props.team._id);
        getTeams().then(setTeams);
    }, [props.team._id]);
    if(!teams){
        return <div>No teams</div>
    }

    return (
        <div className="bg-slate-900 border-r border-slate-700 w-72 pt-6 px-6 text-slate-200 flex flex-col"

>
            
            <div className="mt-6 mb-12 rounded-xl bg-slate-800 border border-slate-700 shadow-lg p-4 flex items-center justify-center text-2xl font-bold text-indigo-400 tracking-wide">
                Team Tracker 
            </div>

            <div className="ml-1">
                <select
                    value={teamId}
                    onChange={(e) => {
                        const newTeamId = e.target.value;
                        setTeamId(newTeamId);
                        navigate(`/dashboard/teams/${newTeamId}/home`);
                    }}
                    className="w-full mt-4 mb-8 bg-slate-800 border border-slate-600 text-slate-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    name="teams"
                    id="teams"
                >
                    {
                        teams.map((t : any) => (
                            <option key={t._id} value={t.teamId._id}>
                                {t.teamId.name}
                            </option>
                        ))
                    }
                </select>

                <div className="mb-8">
                    <NavLink 
                        to="/dashboard/teams/new" 
                        className="block w-full text-center bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md font-medium transition"
                    >
                        Create Team
                    </NavLink>
                </div>
            </div>

            <div className="space-y-4 mt-6">
                <div className="rounded-md">
                    <NavLink 
                        to={`/dashboard/teams/${teamId}/home`} 
                        className="block px-4 py-2 rounded-md hover:bg-slate-800 hover:text-white transition text-sm font-medium"
                    >
                        Home
                    </NavLink>
                </div>

                <div className="rounded-md">
                    <NavLink 
                        to={`/dashboard/teams/${teamId}/task`} 
                        className="block px-4 py-2 rounded-md hover:bg-slate-800 hover:text-white transition text-sm font-medium"
                    >
                        Tasks
                    </NavLink>
                </div>

                <div className="rounded-md">
                    <NavLink 
                        to={`/dashboard/teams/${teamId}/project`} 
                        className="block px-4 py-2 rounded-md hover:bg-slate-800 hover:text-white transition text-sm font-medium"
                    >
                        Projects
                    </NavLink>
                </div>

                <div className="rounded-md">
                    <NavLink 
                        to={`/dashboard/teams/${teamId}/team-member`} 
                        className="block px-4 py-2 rounded-md hover:bg-slate-800 hover:text-white transition text-sm font-medium"
                    >
                        Team Members
                    </NavLink>
                </div>
            </div>

        </div>

    )
}