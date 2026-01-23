import { authClient } from "./client"

export const createTask = async (payload : {
    title : string,
    description : string,
    priority : string,
    assignedTo : string,
    assignedBy : string,
    sprintId : string
}) => {
    const response = await authClient.post(`sprints/${payload.sprintId}/tasks`, payload);
    return response.data;
}