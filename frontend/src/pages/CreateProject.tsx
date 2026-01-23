import { useState } from "react"
import { useNavigate, useParams } from "react-router";
import { createProject } from "../api/project.api";

export default function CreateProject(){
    const {teamId} = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");

    const createhandler = async () => {
        await createProject(teamId as string, {
            name : name
        });
        navigate(`/dashboard/teams/${teamId}/project`);
    }

    return (
        <div>
            <div>
                <label>Project Name</label>
                <input type="text" className="border rounded-lg px-2 py-1" onChange={(e) => setName(e.target.value)}/>
            </div>
            <button onClick={createhandler}>Create</button>
        </div>
    )
}