import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router"
import { getTask } from "../api/task.api";

type DashboardContext = {
    team : any
}

export default function SingleTaskPage(){
    const {team} = useOutletContext<DashboardContext>();
    const {taskId} = useParams();
    const [task, setTask] = useState<any>({});
    
    useEffect(() => {
        if(!taskId) return;
        getTask(taskId as string).then(setTask);
    }, [taskId]);
    if(!team){
        return <div>No team</div>
    }
    if(!task.data){
        return <div>No task</div>
    }
    return(
        <div>
            <h1 className="font-bold text-4xl ml-40 m-10">{task.data.title}</h1>
            <div className="flex justify-evenly gap-120  m-10">
                <div>
                    <div className="flex justify-between gap-10 m-15">
                        <div className="flex gap-2">
                            <p>Priority:</p>
                            <p>{task.data.priority}</p>
                        </div>
                        <div className="flex gap-2">
                            <p>Status:</p>
                            <p>{task.data.status}</p>
                        </div>
                    </div>
                    <div>
                        {task.data.description}
                    </div>
                    <div>
                        Comments.....
                    </div>
                    <div>
                        <textarea className="border-1 shadow-lg w-140 h-60 rounded-lg mt-20 m-8 p-5 focus:outline-none" placeholder="Write comment..."/>
                        <button className="ml-125 bg-blue-600 text-white cursor-pointer font-semibold w-20 rounded-md">Add</button>
                    </div>
                </div>
                <div>
                    <label>Assigned To: </label>
                    <select>
                        <option>{task.data.assignedTo}</option>
                    </select>
                    <label>Assigned By: </label>
                    <select>
                        <option>{task.data.assignedBy}</option>
                    </select>
                    
                    <p>Created At: {task.data.createdAt}</p>
                    <p>Updated At: {task.data.updatedAt}</p>

                </div>
            </div>
        </div>
    )
}