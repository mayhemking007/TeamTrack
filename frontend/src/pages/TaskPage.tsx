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
        fetchTasks();
    },[team,selectedProject, selectedSprint, assignTo, page, limit]);
    if(!team){
        return <div>No Team</div>
    }
    return(
        <div>
            <Navbar teamName={team.name} heading="Tasks" subLine="Work on your Tasks"/>
            <div>
                <div className="flex justify-evenly bg-blue-200 ">
                    <select value={assignTo} onChange={(e) => setAssignTo(e.target.value)} >
                        <option value="">All Tasks</option>
                        <option value="me">My tasks</option>
                    </select>
                    <select value={selectedProject ?? ""} onChange={(e) => {
                        setSelectedProject(e.target.value || null);
                        setSelectedSprint(null);
                        }}>
                            <option value="">All Projects</option>
                        {
                            projects.map((pro : any) => (
                                <option key={pro._id} value={pro._id}>{pro.name}</option>
                            ))
                        }
                    </select>
                    <select value={selectedSprint ?? ""} disabled={!selectedProject} onChange={(e) => {
                        setSelectedSprint(e.target.value || null);
                    }}>
                        <option value="">All Sprints</option>
                        {
                            sprints.map((spri : any) => (
                                <option key={spri._id} value={spri._id}>{spri.name}</option>
                            ))
                        }
                    </select>
                    <select value={limit} onChange={(e) => setLimit((Number(e.target.value)))}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <div>
                    {
                        tasks.map((t : any) => (
                            <div key={t._id} className="flex justify-evenly bg-yellow-300">
                                <NavLink to={`/dashboard/teams/${team._id}/tasks/${t._id}`}>{t.title}</NavLink>
                                <p>{t.priority}</p>
                                <p>{t.assignedTo}</p>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>prev</button>
                    <span>Page {page} of {totalPages}</span>
                    <button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>next</button>
                </div>
                
            </div>
        </div>
    )
}