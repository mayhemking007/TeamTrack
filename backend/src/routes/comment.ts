import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { teamMiddleware } from "../middleware/team.js";
import express from "express";
import { CommentModel, TeamMemberModel } from "../db/Model.js";
import {z} from "zod";

export const commentRouter = Router();

commentRouter.use(express.json());
commentRouter.use(authMiddleware);


commentRouter.post('/tasks/:taskId/comment', teamMiddleware, async(req, res) => {
    
    const reqBody = z.object({
            content : z.string().min(3),
            teamId : z.string()
    });
    const valid = reqBody.safeParse(req.body);
    if(!valid.success){
        res.status(400).json({
            success : false,
            error : valid.error.issues[0]?.message
        })
        return;
    }
    const content = req.body.content;
    const teamId = req.body.teamId;
    const userId = req.userId;
    const taskId = req.params.taskId;
    const date = new Date();

    try{
        const teamMember = await TeamMemberModel.findOne({
            userId : userId!,
            teamId : teamId
        })
        if(!teamMember){
            res.status(402).json({
                success : false,
                error : "Only team members can comment"
            });
            return;
        }
        const comment = await CommentModel.create({
            content : content,
            createdAt : date,
            taskId : taskId as string,
            commentedBy : teamMember._id
        });
        if(comment){
            res.json({
                success : true,
                data : comment
            });
        }
        else{
            res.status(503).json({
                success : false,
                error : "Cannot post the comment!"
            });
        }
    }
    catch(e){
        console.log(e);
        res.status(503).json({
            success : false,
            error : "Cannot POST comment. Please try again later."
        });
    }
});

commentRouter.get('/tasks/:taskId/comment', teamMiddleware, async (req, res) => {
    const taskId = req.params.taskId;
    try{
        const comments = await CommentModel.find({
            taskId : taskId!
        }).populate({
            path : "commentedBy",
            populate : {
                path : "userId",
                select : "name username email"
            }
        }).sort({createdAt : 1});
        if(comments){
            res.json({
                success : true,
                data : comments
            });
        }
        else{
            res.status(403).json({
                success : false,
                error : "Cannot GET comments. The Task does not exists."
            })
        }

    }
    catch(e){
        console.log(e);
        res.status(503).json({
            success : false,
            error : "Cannot GET commments. Please try again later."
        })
    }
})