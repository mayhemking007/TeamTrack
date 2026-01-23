import { authClient } from "./client"

export const getTeams = async() => {
    const response = await authClient.get('/teams');
    return response.data.data;
}

export const createTeam = async(payload : {
    name : string
}) => {
    const response = await authClient.post('/teams', payload);
    return response.data;
}

export const getTeam = async(teamId : string) => {
    const response = await authClient.get(`/teams/${teamId}`);
    return response.data;

}
export const getDashState = async(teamId : string) => {
    const response = await authClient.get(`/teams/${teamId}/dash-stats`);
    return response.data.data;
}