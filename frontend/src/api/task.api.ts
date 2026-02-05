import { authClient } from "./client"

export const createTask = async (payload : {
    title : string,
    description : string,
    priority : string,
    assignedTo : any,
    assignedBy : any,
    sprintId : string
}) => {
    console.log(payload.assignedTo);
    const response = await authClient.post(`tasks/sprints/${payload.sprintId}/tasks`, payload);
    return response.data;
}

export const getTasksFiltered = async (teamId : string, projectId : string, sprintId : string, page : number, limit : number, assignTo : string) => {
    const response = await authClient.get(`tasks/teams/${teamId}/tasks?projectId=${projectId}&sprintId=${sprintId}&assignTo=${assignTo}&page=${page}&limit=${limit}`);
    console.log(response.data);
    return response.data;
}

export const getTask = async (taskId : string) => {
    const response = await authClient.get(`/tasks/${taskId}`);
    return response.data;
}