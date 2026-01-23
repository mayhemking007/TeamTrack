import { authClient } from "./client"

export const getSprints = async (projectId : string) => {
    const response = await authClient.get(`/projects/${projectId}/sprints`);
    return response.data.data;
}