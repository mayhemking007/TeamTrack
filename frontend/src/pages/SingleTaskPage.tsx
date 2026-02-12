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
        <div className="flex-1 flex flex-col bg-slate-900 text-slate-200">
    
            <Navbar teamName={team.name} heading="Task" subLine="Work on task here"/>

            <div className="p-8 space-y-8">

                <h1 className="font-bold text-3xl text-white">
                    {task.data.title}
                </h1>

                <div className="grid grid-cols-3 gap-10">

                   
                    <div className="col-span-2 space-y-8">

                        <div className="flex gap-10 bg-slate-800 border border-slate-700 p-6 rounded-xl">
                            <div className="flex gap-2">
                                <p className="text-slate-400">Priority:</p>
                                <p className="font-medium">{task.data.priority}</p>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-slate-400">Status:</p>
                                <p className="font-medium">{task.data.status}</p>
                            </div>
                        </div>

                        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl space-y-4">
                            <h3 className="font-semibold text-lg text-white">Description</h3>
                            
                            <div className="bg-slate-700 border border-slate-600 rounded-md p-4" >
                                    {task.data.description}
                            </div>
                        </div>

                      
                        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl space-y-4">
                            <h3 className="font-semibold text-lg text-white">Comments</h3>
                            {
                                comments.map((com : any) => (
                                    <div className="bg-slate-700 border border-slate-600 rounded-md p-4" key={com._id}>
                                        <h3 className="font-semibold text-indigo-400">
                                            {com.commentedBy.userId.name}
                                        </h3>
                                        <div className="text-slate-300 mt-1">
                                            {com.content}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                      
                        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl space-y-4">
                            <textarea
                                value={content}
                                id="content"
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full h-40 bg-slate-700 border border-slate-600 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Write comment..."
                            />
                            <div className="flex justify-end">
                                <button
                                    onClick={submitHandler}
                                    className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md transition"
                                >
                                    Add
                                </button>
                            </div>
                        </div>

                    </div>

                   
                    <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl space-y-6">

                        <div>
                            <label className="block text-slate-400 mb-1">Assigned To</label>
                            <select className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2">
                                <option>{task.data.assignedTo.userId.name}</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-slate-400 mb-1">Assigned By</label>
                            <select className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2">
                                <option>{task.data.assignedBy.userId.name}</option>
                            </select>
                        </div>

                        <div className="text-sm text-slate-400 space-y-2 pt-4 border-t border-slate-700">
                            <p>Created At: {task.data.createdAt}</p>
                            <p>Updated At: {task.data.updatedAt}</p>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    )
}