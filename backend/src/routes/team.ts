import express, { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { TeamMemberModel, TeamModel } from "../db/Model.js";
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