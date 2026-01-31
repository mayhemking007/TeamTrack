import { useState } from "react"
import { createTeam } from "../api/team.api";
import { useNavigate } from "react-router";

export default function CreateTeam(){
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const createhandler = async() => {
        const team = await createTeam({name : name});
        navigate(`/dashboard/teams/${team.data.id}/home`);
    }
    return (
        <div>
            <div>
                <label>Team Name</label>
                <input type="text" className="border rounded-lg px-2 py-1" onChange={(e) => setName(e.target.value)}/>
            </div>
            <button onClick={createhandler}>Create</button>
        </div>
    )
}