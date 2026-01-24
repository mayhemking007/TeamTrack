import { authClient } from "./client"

export const getProjects = async (teamId : string) => {
    const response = await authClient.get(`/projects/teams/${teamId}/projects`);
    return response.data.data;
}

export const createProject = async (teamId : string, payload : {
    name : string
}) => {
    const response = await authClient.post(`/projects/teams/${teamId}/projects`, payload);
    return response.data;
} 

export const getDashStats = async (teamId : string, projectId : string) => {
    const response = await authClient.get(`/projects/teams/${teamId}/projects/${projectId}/dash-stats`);
    return response.data.data;
}