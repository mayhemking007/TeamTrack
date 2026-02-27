import { NavLink, useOutletContext} from "react-router";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getProjects } from "../api/project.api";
import { getSprints } from "../api/sprint.api";
import { getTasksFiltered } from "../api/task.api";

type DashboardContext = {
    team : any
}


export default function TaskPage(){
    const {team} = useOutletContext<DashboardContext>();
    const [projects, setProject] = useState<any>([]);
    const [sprints, setSprint] = useState<any>([]);
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [selectedSprint, setSelectedSprint] = useState<any>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(5);
    const [assignTo, setAssignTo] = useState("");
    const [tasks, setTasks] = useState<any>([]);

    const fetchTasks = async () => {
        const tasks = await getTasksFiltered(team._id, selectedProject as string, selectedSprint as string, page, limit, assignTo);
        setTasks(tasks.data);
        setTotalPages(tasks.pagination.totalPages); 
    }

    useEffect(() => {
        if(!team._id) return;
        getProjects(team._id).then(setProject);
        
    }, [team]);
    useEffect(() => {
        if(!selectedProject){
            setSelectedSprint(null);
            setSprint([]);
            return;
        }
        getSprints(selectedProject).then(setSprint);
    },[selectedProject]);
    useEffect(() => {
        if(!team?._id) return;
        fetchTasks();
    },[team,selectedProject, selectedSprint, assignTo, page, limit]);
    if(!team){
        return <div>No Team</div>
    }
    // if(tasks.length === 0){
    //     return <div className="text-white">No task</div>
    // }
    return(
        <div className="flex-1 flex flex-col bg-slate-900 text-slate-200">
    
            <Navbar teamName={team.name} heading="Tasks" subLine="Work on your Tasks"/>

            <div className="p-8 space-y-8">

                <div className="flex flex-wrap gap-6 bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-lg">
                    
                    <select
                        value={assignTo}
                        onChange={(e) => setAssignTo(e.target.value)}
                        className="bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">All Tasks</option>
                        <option value="me">My tasks</option>
                    </select>

                    <select
                        value={selectedProject ?? ""}
                        onChange={(e) => {
                            setSelectedProject(e.target.value || null);
                            setSelectedSprint(null);
                        }}
                        className="bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">All Projects</option>
                        {
                            projects.map((pro : any) => (
                                <option key={pro._id} value={pro._id}>{pro.name}</option>
                            ))
                        }
                    </select>

                    <select
                        value={selectedSprint ?? ""}
                        disabled={!selectedProject}
                        onChange={(e) => {
                            setSelectedSprint(e.target.value || null);
                        }}
                        className="bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        <option value="">All Sprints</option>
                        {
                            sprints.map((spri : any) => (
                                <option key={spri._id} value={spri._id}>{spri.name}</option>
                            ))
                        }
                    </select>

                    <select
                        value={limit}
                        onChange={(e) => setLimit((Number(e.target.value)))}
                        className="bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                </div>


             
                <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg divide-y divide-slate-700">
                    <div className="grid grid-cols-3 items-center px-6 py-4 bg-slate-850 text-slate-300 font-semibold">
                                
                            <p className="font-medium">Task</p>
                            <p className="font-medium">Priority</p>
                            <p className="font-medium">AssignTo</p>
                    </div>
                    {
                        tasks.length > 0 ? tasks.map((t : any) => (
                            <div key={t._id} className="grid grid-cols-3 items-center px-6 py-4 hover:bg-slate-700 transition">
                                <NavLink 
                                    to={`/dashboard/teams/${team._id}/tasks/${t._id}`}
                                    className="font-medium hover:text-indigo-400 transition"
                                >
                                    {t.title}
                                </NavLink>
                                <p className="text-sm text-slate-300">{t.priority}</p>
                                <p className="text-sm text-slate-400">{t.assignedTo?.userId?.name}</p>
                            </div>
                        )) : 
                        <></>
                    }
                </div>


        
                <div className="flex items-center justify-center gap-6 mt-6">
                    <button
                        onClick={() => setPage((p) => p - 1)}
                        disabled={page === 1}
                        className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-md hover:bg-slate-600 transition disabled:opacity-40"
                    >
                        Prev
                    </button>

                    <span className="text-slate-300 text-sm">
                        Page {page} of {totalPages === 0 ? 1 : totalPages}
                    </span>

                    <button
                        onClick={() => setPage((p) => p + 1)}
                        disabled={page >= totalPages}
                        className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-md hover:bg-slate-600 transition disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>

            </div>

        </div>

    )
}