import  express, { Router } from "express";
import {z} from "zod";
import { ProjectModel, SprintModel, TaskModel } from "../db/Model.js";
import { teamMiddleware } from "../middleware/team.js";
import { AdminMiddleware } from "../middleware/admin.js";
import { authMiddleware } from "../middleware/auth.js";

export const taskRouter = Router();

taskRouter.use(express.json());
taskRouter.use(authMiddleware);

taskRouter.post('/sprints/:sprintId/tasks', AdminMiddleware, teamMiddleware, async (req, res) => {
    const reqBody = z.object({
        title : z.string().min(3).max(50),
        description : z.string().min(3).max(1000),
        assignedBy : z.string().min(3).max(50),
        assignedTo : z.string().min(3).max(50),
        priority : z.string().min(1).max(10)
    });
    const parsedBody = reqBody.safeParse(req.body);
    if(!parsedBody.success){
        res.status(400).json({
            success : false,
            error : parsedBody.error.issues[0]?.message
        });
        return;
    }
    const sprintId = req.params.sprintId;
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;
    const assignBy = req.body.assignBy;
    const assignTo = req.body.assignTo;
    let thisProject = null;
    try{
        
        const sprint = await SprintModel.findOne({
            _id : sprintId, 
            status : "active"
        });
        if(sprint){
            const project = await ProjectModel.findOne({
                _id : sprint.projectId,
                status : "active"
            });
            if(!project){
                res.status(403).json({
                    status : false,
                    error : "Invalid Project."
                });
                return;
            }
            else{
                thisProject = project;
            }
        }
        else{
            res.status(403).json({
                status : false,
                error : "Invalid Sprint."
            });
            return;
        }
        const task = await TaskModel.create({
            title : title,
            description : description,
            priority : priority,
            assignedBy : assignBy,
            assignedTo : assignTo,
            status : "active",
            sprintId : sprintId as string,
            projectId : sprint!.projectId!,
            teamId : thisProject!.teamId!
        });
        if(task){
            res.json({
                success : true,
                data : task
            })
        }
        else{
            res.status(401).json({
                success : false,
                error : "Team is invalid. Cannot create Task."
            })
        }
    }
    catch(e){
        console.log(e);
        res.status(503).json({
            success : false,
            error : "Cannot create the Task"
        })
    }
});

taskRouter.get('/sprints/:sprintId/tasks', teamMiddleware, async (req, res) => {
    const sprintId = req.params.sprintId;
    try{
        const tasks = await TaskModel.find({
            sprintId : sprintId!,
            status : "active"
        })
        if(tasks){
            res.json({
                success : true,
                data : tasks
            });
        }
        else{
            res.status(401).json({
                success : false,
                error : "Invalid sprint. Cannot GET tasks"
            })
        }
    }
    catch(e){
        console.log(e);
        res.status(503).json({
            success : false,
            error : "Cannot GET tasks. Please try later."
        })
    }    
});

taskRouter.put('/:taskId', teamMiddleware, AdminMiddleware ,async (req, res) => {
    const reqBody = z.object({
        title : z.string().min(3).max(50),
        description : z.string().min(3).max(1000),
        assignedBy : z.string().min(3).max(50),
        assignedTo : z.string().min(3).max(50),
        priority : z.string().min(1).max(10)
    });
    const parsedBody = reqBody.safeParse(req.body);
    if(!parsedBody.success){
        res.status(400).json({
            success : false,
            error : parsedBody.error.issues[0]?.message
        });
        return;
    }
    const taskId = req.params.taskId;
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;
    const assignBy = req.body.assignBy;
    const assignTo = req.body.assignTo;
    try{
        const task = await TaskModel.findOneAndUpdate(
            {_id : taskId},
            {
                $set : {
                    title : title,
                    description : description,
                    priority : priority,
                    assignedBy : assignBy,
                    assignedTo : assignTo,
                }
            }
        );
        if(task){
            res.json({
                success : true,
                data : task
            })
        }
        else{
            res.status(401).json({
                success : false,
                error : "Invalid task. Cannot update the task."
            });
        }
    }
    catch(e){
        console.log(e);
        res.status(503).json({
            success : false,
            error : "Cannot PUT task. Please try later."
        });
    }
});

taskRouter.delete('/:taskId', teamMiddleware, AdminMiddleware ,async (req, res) => {
    const taskId = req.params.taskId;
    try{
        const task = await TaskModel.updateOne(
            {_id : taskId},
            {
                $set : {status : "inactive"}
            }
        );
        if(task){
            res.json({
                success : true,
                data : {
                    id : taskId
                }
            })
        }
        else{
            res.status(403).json({
                    success : false,
                    error : "The task does not exists"
            });
        }
    }
    catch(e){
        console.log(e);
        res.status(503).json({
            success : false,
            error : "Cannot DELETE task. Please try again later."
        });
    }

});

// taskRouter.get('/tasks')