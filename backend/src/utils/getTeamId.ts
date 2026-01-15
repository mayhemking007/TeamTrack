import { type Request} from "express";
import { ProjectModel, SprintModel, TaskModel } from "../db/Model.js";

const getTeamIdwithProjectId = async(projectId : string) => {
    try{
        const project = await ProjectModel.findOne({
            _id : projectId
        });
        if(project){
            return project.teamId;
        }
        else{
            return null;
        }
    }
    catch(e){
        console.log(e);
        return null;
    }
    
}

const getTeamIdwithSprintId = async(sprintId : string) => {
    try{
        const sprint = await SprintModel.findOne({
            _id : sprintId
        });
        if(sprint){
            return getTeamIdwithProjectId(sprint.projectId?.toString() as string);
        }
        else{
            return null;
        }
    }
    catch(e){
        console.log(e);
        return null;
    }
    
}

const getTeamIdwithTaskId = async(taskId : string) => {
    try{
        const task = await TaskModel.findOne({
            _id : taskId
        });
        if(task){
            return getTeamIdwithSprintId(task.sprintId?.toString() as string);
        }
        else{
            return null;
        }
    }
    catch(e){
        console.log(e);
        return null;
    }
    
}

export const getTeamId = async (req : Request) => {
    if(req.params.teamId){
        return req.params.teamId;
    }
    else if(req.params.projectId){
        return getTeamIdwithProjectId(req.params.projectId as string);
    }
    else if(req.params.sprintId){
        return getTeamIdwithSprintId(req.params.sprintId as string);
    }
    else if(req.params.taskId){
        return getTeamIdwithTaskId(req.params.taskId as string);
    }
    else{
        return null;
    }
}