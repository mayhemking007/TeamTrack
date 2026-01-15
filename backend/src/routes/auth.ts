import express, { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {z} from "zod";
import { UserModel } from "../db/Model.js";
import { authMiddleware } from "../middleware/auth.js";

dotenv.config();
export const authRouter = Router();

authRouter.use(express.json());

authRouter.post('/signup', async (req, res) => {
    const reqBody = z.object({
        username : z.string().min(3).max(50),
        name : z.string().min(2).max(100),
        email : z.string().min(5).max(100).email(),
        password : z.string().min(7).max(100)
    });
    const parsedBody = reqBody.safeParse(req.body);
    if(!parsedBody.success){
        console.log(parsedBody.error);
        res.status(400).json({
            success : false,
            error : parsedBody.error.issues[0]?.message
        });
        return;
    }
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const email = req.body.email;
    try{
        const encoded = await bcrypt.hash(password, 10);
        if(!encoded){
            console.log("Bcrypt password encoding error")
            res.status(501).json({
                success : false,
                error : "Problem with signup, try again"
            })
            return;
        }
        const success = await UserModel.create({
            username : username,
            password : encoded,
            name : name,
            email : email
        });
        if(success){
            res.json({
                success : true,
                data : {
                    username,
                    name,
                    email
                }
            })
        }
    }
    catch(e){
        console.log(e);
        res.status(403).json({
            success :false,
            error : "Email already exists."
        })
    }
});
authRouter.post('/login', async (req, res) => {

    const reqBody = z.object({
        username : z.string().min(3).max(50),
        password : z.string().min(7).max(100)
    });
    const parsedBody = reqBody.safeParse(req.body);
    if(!parsedBody.success){
        console.log(parsedBody.error);
        res.status(400).json({
            success : false,
            error : parsedBody.error.issues[0]?.message
        })
        return;
    }

    const username = req.body.username;
    const password = req.body.password;

    try{
        const user = await UserModel.findOne({
            username : username
        });
        if(user){
            const isCorrectPass = await bcrypt.compare(password, user.password as string)
            if(isCorrectPass){
                const token = jwt.sign({
                    username : username
                }, process.env.JWT_SECRET as string);
                
                res.json({
                    success : true,
                    data : {
                        token : token
                    }
                })
            }
        }
        else{
            res.status(402).json({
                success : false,
                error : "Incorrect username or password"
            });
            return;
        }
    }
    catch(e){
        console.log(e);
        res.status(503).json({
            success : false,
            error : "Cannot get username or password"
        });
    }
});
authRouter.use(authMiddleware);
authRouter.get('/me', async (req,res) => {
    const userId = req.userId;
    try{
        const user = await UserModel.findOne({
            
            _id : userId
        });
        if(user){
            res.json({
                success : true,
                data : {
                    id : user.id,
                    username : user.username,
                    name : user.name,
                    email : user.email
                }
            })
        } 
        else{
            res.status(404).json({
                success : false,
                error : "User not found"
            });
            return;
        }
    }
    catch(e){
        console.log(e);
        res.status(503).json({
            success : false,
            error : "Cannot get user"
        })
    }
})