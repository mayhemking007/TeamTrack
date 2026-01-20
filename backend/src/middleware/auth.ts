import express, { type NextFunction, type Request, type Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { UserModel } from "../db/Model.js";

dotenv.config();
const app = express();

interface JwtPayload {
    userId : string
}

app.use(express.json());

export const authMiddleware = async (req : Request, res : Response, next : NextFunction) => {
   
    const authHeader = req.headers.authorization;
    if(!authHeader){
        res.status(401).json({
            success : false,
            error : "Authorization token is missing"
        })
        return;
    }
    const token = authHeader.split(" ")[1];
    try{
        const decodedToken = jwt.verify(token as string, process.env.JWT_SECRET as string) as JwtPayload;
        if(!decodedToken){
            res.status(401).json({
                success : false,
                error : "Invalid authorization token"
            })
            return;
        }
        req.userId = decodedToken.userId;
        next();
    }
    catch(e){
        res.status(401).json({
            success : false,
            error : "Cannot validate authorization token"
        });
    }
    

}