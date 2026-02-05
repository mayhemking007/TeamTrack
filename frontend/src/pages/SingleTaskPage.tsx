import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router"
import { getTask } from "../api/task.api";
import { createComment, getComments } from "../api/comment.api";
import Navbar from "../components/Navbar";

type DashboardContext = {
    team : any
}

export default function SingleTaskPage(){
    const {team} = useOutletContext<DashboardContext>();
    const {taskId, teamId} = useParams();
    const [task, setTask] = useState<any>({});
    const [comments, setComments] = useState<any>([])
    const [content, setContent] = useState("");
    const [commentLoading, setCommentLoading] = useState(false);
    
    const submitHandler = async () => {
        setCommentLoading(true);
        await createComment(taskId as string, {
            content : content as string,
            teamId : teamId as string
        })
        setCommentLoading(false);
        setContent("");       
    }

    useEffect(() => {
        if(!taskId) return;
        getTask(taskId as string).then(setTask);
        
    }, [taskId]);
    useEffect(() => {
        if(!taskId) return;
        getComments(taskId as string).then(setComments); 
    }, [commentLoading, taskId]);
    if(!team){
        return <div>No team</div>
    }
    if(!task.data){
        return <div>No task</div>
    }
    if(!comments){
        return <div>No Comments</div>
    }
    return(
        <div>
            <Navbar teamName={team.name} heading="Task" subLine="Work on task here"/>
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
                        {   
                            comments.map((com : any) => (
                                <div className="border-1 rounded-md p-2 ml-5" key={com._id}>
                                    <h3 className="font-semibold">{com.commentedBy.userId.name}</h3>
                                    <div>{com.content}</div>
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <textarea value={content} id="content" onChange={(e) => setContent(e.target.value)} className="border-1 shadow-lg w-140 h-60 rounded-lg mt-20 m-8 p-5 focus:outline-none" placeholder="Write comment..."/>
                        <button onClick={submitHandler} className="ml-125 bg-blue-600 text-white cursor-pointer font-semibold w-20 rounded-md">Add</button>
                    </div>
                </div>
                <div>
                    <label>Assigned To: </label>
                    <select>
                        <option>{task.data.assignedTo.userId.name}</option>
                    </select>
                    <label>Assigned By: </label>
                    <select>
                        <option>{task.data.assignedBy.userId.name}</option>
                    </select>
                    
                    <p>Created At: {task.data.createdAt}</p>
                    <p>Updated At: {task.data.updatedAt}</p>

                </div>
            </div>
        </div>
    )
}