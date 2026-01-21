import { useOutletContext } from "react-router";
import Navbar from "../components/Navbar";

type DashboardContext = {
    team : any
}

export default function ProjectPage(){
    const {team} = useOutletContext<DashboardContext>();
    return(
        <div>
            <Navbar teamName={team.name} heading="Projects" subLine="Work on all your projects"/>
            Welcome to Project Page
        </div>
    )
}