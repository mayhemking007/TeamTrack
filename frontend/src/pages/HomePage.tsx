
import { useOutletContext } from "react-router";
import Navbar from "../components/Navbar";

type DashboardContext = {
    team : any
}

export default function HomePage(){
    const {team} = useOutletContext<DashboardContext>()
    return(
        <div>
            <Navbar teamName={team.name} heading="Home" subLine="Monitor all your work here"/>
            <div >
                Welcome to Home Page
            </div>
            
        </div>
    )
}