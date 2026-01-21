
import { useState } from "react";
import { createTeam } from "../api/team.api"
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function NoTeamPage(){
    const [teamName, setTeamName] = useState("");
    const { LogOut} = useAuth();
    const logoutHandler = () => {
        LogOut();
        navigate("/login");
    }
    const navigate = useNavigate();
    const creatTeamHandler = async() => {
        const response = await createTeam({name : teamName});
        if(response.success){
            const teamId = response.data.id;
            navigate(`/dashboard/teams/${teamId}`);
        }
        else{
            alert("Cannot create the team");
            return;
        }
    }
    return ( 
        <div>
            
            <h2>You are not a member of any team.</h2>
            <div className="">
            <h1>Create Team</h1>
            <input type="text" id="name" onChange={(e) => setTeamName(e.target.value)} className="border-1"/>
            <button onClick={creatTeamHandler}>Create</button>
            <br />
            <button onClick={logoutHandler}  >Logout</button>
            </div>
        </div>
    )
}