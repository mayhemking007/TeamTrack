import { useEffect, useState } from "react"
import { createTask } from "../api/task.api";
import { useParams } from "react-router";
import { getTeamMember } from "../api/teamMember.api";

export default function CreateTask(){
    const {sprintId, teamId} = useParams();

    const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [assignedBy, setAssignedBy] = useState("");
    const [priority, setPriority] = useState("medium");
    const [teamMember, setTeamMember] = useState([]);

    const createhandler = async () => {
        await createTask({
            title : title,
            description : Description,
            assignedBy : assignedBy,
            assignedTo : assignedTo,
            priority : priority,
            sprintId : sprintId as string
        })
    }
    
    useEffect(() => {
        getTeamMember(teamId as string).then(setTeamMember);
    }, [teamId]);

    return (
        <div>
            <div>
                <label>Title</label>
                <input type="text" className="border rounded-lg px-2 py-1" onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <label>Description</label>
                <textarea className="border rounded-lg px-2 py-1" onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div>
                <label>Assigned To</label>
                <select onChange={(e) => setAssignedTo(e.target.value)}>
                    <option>Select the team member</option>
                    {
                        teamMember.length === 0 ? <></> :
                        teamMember.map((mem : any) => (
                            <option value={mem.id} key={mem.id}>{mem.userId.name}</option>
                        )) 
                    }
                </select>
            </div>
            <div>
                <label>Assigned By</label>
                <input type="text" className="border rounded-lg px-2 py-1" onChange={(e) => setAssignedBy(e.target.value)}/>
            </div>
            <div>
                <label>Priority</label>
                <select onChange={(e) => setPriority(e.target.value)}>
                    <option value = "low">Low</option>
                    <option value = "medium">Medium</option>
                    <option value = "high">High</option>
                </select>
            </div>
            <button onClick={createhandler}>Create</button>
        </div>
    )
}