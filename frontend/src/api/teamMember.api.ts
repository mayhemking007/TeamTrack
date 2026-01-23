import { authClient } from "./client"

export const getTeamMember = async (teamId : string) => {
    const response = await authClient(`/teams/${teamId}/team-members`);
    return response.data.data;
}