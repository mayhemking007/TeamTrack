import  express, { Router } from "express";
import {z} from "zod";
import { ProjectModel, SprintModel, TaskModel } from "../db/Model.js";
import { teamMiddleware } from "../middleware/team.js";
import { AdminMiddleware } from "../middleware/admin.js";
import { authMiddleware } from "../middleware/auth.js";

export const sprintRouter = Router();

sprintRouter.use(express.json());
sprintRouter.use(authMiddleware);

sprintRouter.post('/projects/:projectId/sprints', AdminMiddleware, teamMiddleware, async (req, res) => {
    const reqBody = z.object({
            name : z.string().min(3).max(50),
            startedAt : z.coerce.date(),
            endDate : z.coerce.date(),
    });
    const parsedBody = reqBody.safeParse(req.body);
    if(!parsedBody.success){
        res.status(400).json({
            success : false,
            error : parsedBody.error.issues[0]?.message
        });
        return;
    }
    const projectId = req.params.projectId;
    const name = req.body.name;
    const startedAt = req.body.startedAt;
    const endDate = req.body.endDate;
    try{
        const project = await ProjectModel.findOne({
            _id : projectId,
            status : "active"
        });
        if(!project){
            res.status(403).json({
                success : false,
                error : "The project does not exists."
            })
        }
        const sprint = await SprintModel.create({
            name : name,
            startedAt: startedAt,
            endDate: endDate,
            projectId : projectId! as string,
            status : "active"
        });
        if(sprint){
            res.json({
                success : true,
                data : {
                    id : sprint.id,
                    name : name, 
                    projectId : projectId,
                    startedAt : startedAt,
                    endDate : endDate
                }
            })
        }
        else{
            res.status(401).json({
                success : false,
                error : "Team is invalid. Cannot create sprint."
            })
        }
    }
    catch(e){
        console.log(e);
        res.status(503).json({
            success : false,
            error : "Cannot create the Sprint"
        })
    }
});

sprintRouter.get('/projects/:projectId/sprints', teamMiddleware, async (req, res) => {
    const projectId = req.params.projectId;
    try{
        const sprints = await SprintModel.find({
            projectId : projectId!,
            status : "active"
        })
        if(sprints){
            res.json({
                success : true,
                data : sprints
            });
        }
        else{
            res.status(401).json({
                success : false,
                error : "Invalid project. Cannot GET sprints"
            })
        }
    }
    catch(e){
        console.log(e);
        res.status(503).json({
            success : false,
            error : "Cannot GET sprint. Please try later."
        })
    }    
});

sprintRouter.put('/:sprintId', teamMiddleware, AdminMiddleware ,async (req, res) => {
    const reqBody = z.object({
            name : z.string().min(3).max(50),
            startedAt : z.coerce.date(),
            endDate : z.coerce.date(),
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
    const name = req.body.name;
    const startedAt = req.body.startedAt;
    const endDate = req.body.endDate;
    try{
        const sprint = await SprintModel.findOneAndUpdate(
            {_id : sprintId},
            {
                $set : {
                    name : name,
                    startedAt : startedAt,
                    endDate : endDate
                }
            }
        );
        if(sprint){
            res.json({
                success : true,
                data : {
                    name : name,
                    id : sprint.id
                }
            })
        }
        else{
            res.status(401).json({
                success : false,
                error : "Invalid Sprint. Cannot update the sprint."
            });
        }
    }
    catch(e){
        console.log(e);
        res.status(503).json({
            success : false,
            error : "Cannot PUT sprint. Please try later."
        });
    }
});

sprintRouter.delete('/:sprintId', teamMiddleware, AdminMiddleware ,async (req, res) => {
    const sprintId = req.params.sprintId;
    try{
        const sprint = await SprintModel.updateOne(
            {_id : sprintId},
            {
                $set : {status : "inactive"}
            }
        );
        if(sprint){
            res.json({
                success : true,
                data : {
                    id : sprintId
                }
            })
        }
        else{
            res.status(403).json({
                    success : false,
                    error : "The sprint does not exists"
            });
        }
    }
    catch(e){
        console.log(e);
        res.status(503).json({
            success : false,
            error : "Cannot DELETE sprint. Please try again later."
        });
    }

});

sprintRouter.get("/:sprintId/sprint-stats", async (req, res) => {
    const sprintId = req.params.sprintId;
    const userId = req.userId;
    let numTasks = 0;
    let numAssignedTasks = 0;
    try{
        const tasks = await TaskModel.find({
            sprintId : sprintId,
            status : "active"
        });
        if(tasks){
            numTasks = tasks.length;
        }
        else{
            console.log("No tasks found with the sprintId");
            numTasks = 0;
        }
        const assignTasks = await TaskModel.find({
            sprintId : sprintId,
            status : "active",
            assignedTo : userId!
        });
        if(assignTasks){
            numAssignedTasks = assignTasks.length;
        }
        else{
            console.log("No tasks found with the sprintId");
            numAssignedTasks = 0;
        }
        res.json({
            success : true,
            data : {
                numTasks : numTasks,
                numAssignedTasks : numAssignedTasks
            }
        });
    }
    catch(e){
        console.log(e);
        res.status(502).json({
            success : false,
            error : "Cannot GET stats. Please try again."
        });
    }
})
