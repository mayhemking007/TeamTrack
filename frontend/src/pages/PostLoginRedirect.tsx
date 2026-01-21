import { useNavigate } from "react-router";
import { getTeams } from "../api/team.api";
import { useAuth } from "../auth/AuthContext"
import { useEffect } from "react";

export default function PostLoginRedirect(){
    const {user} = useAuth();
    const navigate = useNavigate();

    const resolveTeams = async() => {
        try{
            const teams = await getTeams();
            if(teams.length === 0){
                navigate('/no-team');
            }
            else{
                const team = teams[0];
                const teamId = team.teamId;
                navigate(`/dashboard/teams/${teamId._id}/home`);
            }
        }
        catch(e){
            console.log(e);
            navigate('/login');
        }
    }
    useEffect(()=>{
        if(!user){
            navigate('/login');
        }
        resolveTeams();
    },[]);

    return <div>Loading...</div>
}