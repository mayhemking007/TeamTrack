import { NavLink } from "react-router";

interface teamInterface {
    team : any
}

export default function Sidebar(props : teamInterface){
    const teamId = props.team._id;
    return (
        <div className="h-screen bg-gray-300 w-75 pt-5 px-6">
            <div className="mt-10 shadow-lg rounded-md mb-10 text-2xl p-4 flex items-center justify-center border-white border-2 font-bold text-blue-400">
                Team Tracker 
            </div>
            <div className="ml-5">
                <select className="hover:bg-gray-200 w-28 mt-10 mb-10 shadow-lg rounded-sm mb-10 text-md p-2 focus:outline-none font-medium border-white border-1" name="teams" id="teams">
                    <option className="font-medium bg-gray-300" value = "Team-1">Team - 1</option>
                    <option className="font-medium bg-gray-300" value = "Team-2">Team - 2</option>
                </select>
            </div>
            <div>
                <div className="ml-5 mt-10 mb-3 hover:bg-gray-200 px-3 py-1 rounded-md w-25 flex items-center justify-center">
                    <NavLink to={`/dashboard/teams/${teamId}/home`} className="text-md font-medium cursor-pointer hover:underline">Home</NavLink>
                </div>
                <div className="ml-5 mt-10 mb-3 hover:bg-gray-200 px-3 py-1 rounded-md w-25 flex items-center justify-center">
                    <NavLink to={`/dashboard/teams/${teamId}/task`} className="text-md font-medium cursor-pointer hover:underline">Tasks</NavLink>
                </div>
                <div className="ml-5 mt-10 mb-3 hover:bg-gray-200 px-3 py-1 rounded-md w-25 flex items-center justify-center">
                    <NavLink to={`/dashboard/teams/${teamId}/project`} className="text-md font-medium cursor-pointer hover:underline">Projects</NavLink>
                </div>
                <div className="ml-4 mt-10 mb-3 hover:bg-gray-200 px-3 py-1 rounded-md w-35 flex items-center justify-center">
                    <NavLink to={`/dashboard/teams/${teamId}/team-member`} className="text-md font-medium cursor-pointer hover:underline">Team Members</NavLink>
                </div>
            </div>
        </div>
    )
}