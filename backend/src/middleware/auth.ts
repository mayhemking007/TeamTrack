import express, { type NextFunction, type Request, type Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { UserModel } from "../db/Model.js";

dotenv.config();
const app = express();

interface JwtPayload {
    username : string
}

app.use(express.json());

export const authMiddleware = async (req : Request, res : Response, next : NextFunction) => {
   
    const token = req.headers.token;
    const decodedToken = jwt.verify(token as string, process.env.JWT_SECRET as string) as JwtPayload;
    if(!decodedToken){
        res.status(401).json({
            success : false,
            error : "Invalid authorization token"
        })
        return;
    }
    try{
        const user = await UserModel.findOne({
            username : decodedToken.username
        })
        if(user){
            req.userId = user.id;
            next();
        }
    }
    catch(e){
        res.status(401).json({
            success : false,
            error : "Cannot validate authorization token"
        });
    }
    

}