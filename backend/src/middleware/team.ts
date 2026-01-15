import  { type NextFunction, type Request, type Response } from "express";
import { TeamMemberModel, TeamModel } from "../db/Model.js";
import { getTeamId } from "../utils/getTeamId.js";



export const teamMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    const userId = req.userId;
    const teamId = await getTeamId(req);
    if(!teamId){
        res.status(403).json({
            success : false,
            error : "Cannot find your team."
        });
        return;
    }
    try{
        const statusActive = await TeamModel.findOne({
            _id : teamId,
            status : "active"
        })
        const member = await TeamMemberModel.findOne({
            teamId : teamId,
            userId : userId!
        });

        if(member && statusActive){
            next();
        }
        else{
            res.status(402).json({
                success : false,
                error : "Forbidden, action only allowed for team member."
            })
            return;
        }
    }
    catch(e){
        console.log(e);
        res.status(503).json({
            success : false,
            error : "Cannot get your team. Please try later."
        });
    }
}