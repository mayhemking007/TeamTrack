import { type NextFunction, type Request, type Response } from "express";
import { TeamMemberModel } from "../db/Model.js";
import { getTeamId } from "../utils/getTeamId.js";


export const AdminMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    const userId = req.userId;
    const teamId = await getTeamId(req);
    console.log(teamId);
    console.log(req.params);
    if(!teamId){
        res.status(403).json({
            success : false,
            error : "Cannot find your team"
        });
        return;
    }
    try{
        const member = await TeamMemberModel.findOne({
            teamId : teamId!,
            userId : userId! ,
            role : "admin"
        });
        if(member){
            next();
        }
        else{
            res.status(402).json({
                success : false,
                error : "Forbidden, action only allowed for admin."
            })
            return;
        }
    }
    catch(e){
        console.log(e);
        res.status(503).json({
            success : false,
            error : "Cannot get your Role. Please try later."
        });
    }
}