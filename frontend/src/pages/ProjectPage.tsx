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
        <div>
            <Navbar teamName={team.name} heading="Projects" subLine="Work on all your projects"/>
            Welcome to Project Page
            <br />
            <NavLink to={`/dashboard/teams/${team._id}/projects/new`}>Create Project</NavLink>

            <div className="mt-20 ml-20 flex flex-wrap">
                {
                    projects.map((pro : any) => (
                        <div key={pro._id} className="w-80 h-20 m-10 mb-8 border rounded-xl shadow-lg px-5 py-5 flex items-center justify-center">
                        <NavLink key={pro._id} to={`/dashboard/teams/${team._id}/projects/${pro._id}`}>{pro.name}</NavLink>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}