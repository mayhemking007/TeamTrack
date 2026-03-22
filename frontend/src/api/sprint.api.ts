import { authClient } from "./client"

export const getSprints = async (projectId : string) => {
    const response = await authClient.get(`/sprints/projects/${projectId}/sprints`);
    return response.data.data;
}

export const createSprints = async (projectId : string, payload : {
    name : string,
    startedAt : Date,
    endDate : Date 
}) => {
    const response = await authClient.post(`/sprints/projects/${projectId}/sprints`, payload);
    return response.data;
}

export const getSprintStats = async (sprintId : string, teamId : string) => {
    const response = await authClient.get(`/sprints/teams/${teamId}/sprint/${sprintId}/sprint-stats`);
    return response.data.data;
}

export const getSprint = async (sprintId : string) => {
    const response = await authClient.get(`/sprints/${sprintId}`);
    console.log(response.data);
    return response.data.data;
}