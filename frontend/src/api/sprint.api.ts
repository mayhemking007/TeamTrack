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