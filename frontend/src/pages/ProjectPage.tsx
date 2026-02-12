import { NavLink, useOutletContext } from "react-router";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getProjects } from "../api/project.api";

type DashboardContext = {
    team : any
}

export default function ProjectPage(){
    const {team} = useOutletContext<DashboardContext>();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        getProjects(team._id).then(setProjects);
        setLoading(false);
    }, []);
    if(loading){
        return <div>Loading...</div>
    }
    return(
        <div className="flex-1 flex flex-col bg-slate-900 text-slate-200">
    
                <Navbar teamName={team.name} heading="Projects" subLine="Work on all your projects"/>

                <div className="p-8 space-y-8">

                    <div className="flex items-center justify-between">
                        <p className="text-slate-400 text-sm">
                            Welcome to Project Page
                        </p>

                        <NavLink 
                            to={`/dashboard/teams/${team._id}/projects/new`}
                            className="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md font-medium transition"
                        >
                            Create Project
                        </NavLink>
                    </div>


                    <div className="grid grid-cols-3 gap-8">
                        {
                            projects.map((pro : any) => (
                                <div 
                                    key={pro._id} 
                                    className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg px-6 py-6 flex items-center justify-center hover:bg-slate-700 transition"
                                >
                                    <NavLink 
                                        to={`/dashboard/teams/${team._id}/projects/${pro._id}`}
                                        className="font-medium hover:text-indigo-400 transition"
                                    >
                                        {pro.name}
                                    </NavLink>
                                </div>
                            ))
                        }
                    </div>

                </div>

            </div>

    )
}