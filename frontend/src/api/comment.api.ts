import { authClient } from "./client"

export const createComment = async (taskId : string, payload : {
    content : string,
    teamId : string
}) => {
    const response = await authClient.post(`/comments/tasks/${taskId}/comment`, payload);
    return response.data;
}

export const getComments = async (taskId : string) => {
    const response = await authClient.get(`/comments/tasks/${taskId}/comment`);
    return response.data.data;
}