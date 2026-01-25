import { useState } from "react"
import { useNavigate, useParams } from "react-router";
import { createSprints } from "../api/sprint.api";


export default function CreateSprint(){
    const {projectId, teamId} = useParams();
    const navigate = useNavigate();
    const now = new Date();
    const [name, setName] = useState("");
    const [endDate, setEndDate] = useState<Date>(now);
    const [startedAt, setStartedAt] = useState<Date>(now);

    const createhandler = async () => {
        await createSprints(projectId as string, {
            name : name,
            endDate : endDate,
            startedAt : startedAt
        });
        navigate(`/dashboard/teams/${teamId}/projects/${projectId}`);
    }

    return (
        <div>
            <div>
                <label>Sprint Name</label>
                <input type="text" className="border rounded-lg px-2 py-1" onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
                <label>Start Date</label>
                <input type="date" className="border rounded-lg px-2 py-1" onChange={(e) => {
                    const date = new Date(e.target.value);
                    setStartedAt(date);
                }}/>
            </div>
            <div>
                <label>End Date</label>
                <input type="date" className="border rounded-lg px-2 py-1" onChange={(e) => {
                    const date = new Date(e.target.value);
                    setEndDate(date);
                }}/>
            </div>
            <button onClick={createhandler}>Create</button>
        </div>
    )
}