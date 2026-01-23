import express, { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { ProjectModel, TaskModel, TeamMemberModel, TeamModel } from "../db/Model.js";
import {z} from "zod";
import { AdminMiddleware } from "../middleware/admin.js";


export const teamRouter = Router();
teamRouter.use(express.json());
teamRouter.use(authMiddleware);

teamRouter.post('/', async(req, res) => {
    const reqBody = z.object({
        name : z.string().min(3).max(100)
    })
    const valid = reqBody.safeParse(req.body);
    if(!valid.success){
        res.status(400).json({
            success : false,
            error : valid.error.issues[0]?.message
        })
    }
    const userId = req.userId;
    const name = req.body.name;
    try{
        const team = await TeamModel.create({
            name : name,
            createdBy :  userId!,
            status : "active"
        });
        
        if(team){
            const member = await TeamMemberModel.create({
                teamId : team.id,
                userId : userId!,
                role : "admin"
            })
            if(member){
                res.json({
                    success : true,
                    data : {
                        id : team.id,
                        name : name,
                        createdBy : userId
                    }
                })
            }
            else{
                res.status(401).json({
                    success : false,
                    error : "Cannot create team-member."
                })
            }
            
        }
        else{
            res.status(402).json({
                success : false,
                error : "User Not logged in"
            })
        }
    }
    catch(e){
        console.log(e);
        res.status(503).json({
            success : false,
            error : "Cannot create team. Please try again."
        })
    }
});

teamRouter.get('/', async (req, res) => {
    const userId = req.userId;
    try{
        const allTeams = await TeamMemberModel.find({
            userId : userId! ,
        }).populate({
            path : "teamId",
            match : {status : "active"}
        }).exec();
        if(allTeams){
            res.json({
                success : true,
                data : allTeams
            })
        }
        else{
            res.status(402).json({
                success : false,
                error : "User Not logged in"
            })
        }
    }
    catch(e){
        console.log(e);
        res.status(503).json({
                success : false,
                error : "Cannot GET teams. Please try again later."
        });
    }
});

teamRouter.get('/:teamId', async(req, res) => {
    const teamId = req.params.teamId;
    try{
        const team = await TeamModel.findOne({
            _id : teamId!,
            status : "active"
        });
        if(team){
            res.json({
                success : true,
                data : team
            })
        }
        else{
            res.status(402).json({
                success : false,
                error : "team is not found"
            })
        }
    }
    catch(e){
        console.log(e);
        res.status(503).json({
                success : false,
                error : "Cannot GET team. Please try again later."
        });
    }

})

teamRouter.delete('/:teamId', AdminMiddleware, async (req, res) => {
    const teamId = req.params.teamId;
    console.log("From the delete route : " + teamId);
    try{
        const team = await TeamModel.updateOne(
            {_id : teamId},
            {
                $set : {status : "inactive"}
            }
        );
        if(team){
            res.json({
                success : true,
                data : {
                    id : teamId
                }
            })
        }else{
            res.status(403).json({
                    success : false,
                    error : "The team does not exists"
            });
            return;
        }
    }
    catch(e){
        console.log(e);
        res.status(503).json({
            success : false,
            error : "Cannot DELETE team. Please try again later."
        });
    }
});

teamRouter.get('/:teamId/dash-stats', async (req, res) => {
    const teamId = req.params.teamId;
    const userId = req.userId;
    let numProjects = 0;
    let numAllTasks = 0;
    let numMyTasks = 0;
    let numDoneTasks = 0;
    try{
        const project = await ProjectModel.find({
            teamId : teamId,
            status : "active"
        });
        if(project){
            numProjects = project.length;
        }
        else{
            console.log("No project found in the team for dash-stats");
            numProjects = 0;
        }
        const allTasks = await TaskModel.find({
            teamId : teamId,
            status : "active"
        });
        if(allTasks){
            numAllTasks = allTasks.length;
        }
        else{
            console.log("No tasks found in the team for dash-stats");
            numAllTasks = 0;
        }
        const myTasks = await TaskModel.find({
            teamId : teamId,
            assignedTo : userId!,
            status : "active"
        });
        if(myTasks){
            numMyTasks = myTasks.length;
        }
        else{
            console.log("No my tasks found in the team for dash-stats");
            numMyTasks = 0;
        }
        const doneTasks = await TaskModel.find({
            teamId : teamId,
            status : "done",
            assignedTo : userId!
        });
        if(doneTasks){
            numDoneTasks = doneTasks.length;
        }
        else{
            console.log("No done tasks found in the team for dash-stats");
            numDoneTasks = 0;
        }

        res.json({
            success : true,
            data : {
                numAllTasks : numAllTasks,
                numDoneTasks : numDoneTasks,
                numMyTasks : numMyTasks,
                numProjects : numProjects
            }
        })

    }
    catch(e){
        console.log(e);
        res.status(501).json({
            success : false,
            error : "Cannot GET dash-stats. Please try again later."
        })
    }
});

teamRouter.get('/:teamId/team-members', async (req, res) => {
    const teamId = req.params.teamId;
    try{
        const teamMembers = await TeamMemberModel.find({
            teamId : teamId
        }).populate("userId");
        if(teamMembers){
            res.json({
                success : true,
                data : teamMembers
            });
        } else{
            res.status(401).json({
                success : false,
                error : "The team does not exists."
            })
        }
    }
    catch(e){
        console.log(e);
        res.status(501).json({
            success : false,
            error : "Cannot GET the team members."
        })
    }
})
