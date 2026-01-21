import { useOutletContext } from "react-router";
import Navbar from "../components/Navbar";

type DashboardContext = {
    team : any
}


export default function TaskPage(){
    const {team} = useOutletContext<DashboardContext>();
    return(
        <div>
            <Navbar teamName={team.name} heading="Tasks" subLine="Work on your Tasks"/>
            Welcome to Task Page
        </div>
    )
}