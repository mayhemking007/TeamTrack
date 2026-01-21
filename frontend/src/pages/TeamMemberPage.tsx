import { useOutletContext } from "react-router";
import Navbar from "../components/Navbar";

type DashboardContext = {
    team : any
}

export default function TeamMemberPage(){
    const {team} = useOutletContext<DashboardContext>();
    return(
        <div>
            <Navbar teamName={team.name} heading="Team Members" subLine="All your team members"/>
            Welcome to Team Member Page
        </div>
    )
}