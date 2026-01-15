import express, { Router } from "express";
import {z} from "zod";
import { ProjectModel } from "../db/Model.js";
import { authMiddleware } from "../middleware/auth.js";
import { teamMiddleware } from "../middleware/team.js";
import { AdminMiddleware } from "../middleware/admin.js";

export const projectRouter = Router();

projectRouter.use(express.json());
projectRouter.use(authMiddleware);


projectRouter.post('/teams/:teamId/projects',teamMiddleware, AdminMiddleware , async (req, res) => {
    const reqBody = z.object({
        name : z.string().min(3).max(50)
    });
    const parsedBody = reqBody.safeParse(req.body);
    if(!parsedBody.success){
        res.status(400).json({
            success : false,
            error : parsedBody.error.issues[0]?.message
        });
        return;
    }
    const teamId = req.params.teamId;
    const name = req.body.name;
    try{
        const project = await ProjectModel.create({
            name : name,
            teamId : teamId! as string,
            status : "active"
        });
        if(project){
            res.json({
                success : true,
                data : {
                    id : project.id,
                    name : name, 
                    teamId : teamId
                }
            })
        }
        else{
            res.status(401).json({
                success : false,
                error : "Team is invalid. Cannot create project."
            })
        }
    }
    catch(e){
        console.log(e);
        res.status(503).json({
            success : false,
            error : "Cannot create the Project"
        })
    } 
});

projectRouter.get('/teams/:teamId/projects', teamMiddleware, async (req, res) => {
    const teamId = req.params.teamId;
    try{
        const projects = await ProjectModel.find({
            teamId : teamId!,
            status : "active"
        })
        if(projects){
            res.json({
                success : true,
                data : projects
            });
        }
        else{
            res.status(401).json({
                success : false,
                error : "Invalid team. Cannot GET projects"
            })
        }
    }
    catch(e){
        console.log(e);
        res.status(503).json({
            success : false,
            error : "Cannot GET projects. Please try later."
        })
    }    
});

projectRouter.put('/:projectId', teamMiddleware, AdminMiddleware ,async (req, res) => {
    const reqBody = z.object({
        name : z.string().min(3).max(50)
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
    try{
        const project = await ProjectModel.findOneAndUpdate(
            {_id : projectId},
            {
                $set : {name : name}
            }
        );
        if(project){
            res.json({
                success : true,
                data : {
                    name : name,
                    id : project.id
                }
            })
        }
        else{
            res.status(401).json({
                success : false,
                error : "Invalid Project. Cannot update the project."
            });
        }
    }
    catch(e){
        console.log(e);
        res.status(503).json({
            success : false,
            error : "Cannot PUT projects. Please try later."
        });
    }
});

projectRouter.delete('/:projectId', teamMiddleware, AdminMiddleware ,async (req, res) => {
    const projectId = req.params.projectId;
    try{
        const project = await ProjectModel.updateOne(
            {_id : projectId},
            {
                $set : {status : "inactive"}
            }
        );
        if(project){
            res.json({
                success : true,
                data : {
                    id : projectId
                }
            })
        }
        else{
            res.status(403).json({
                    success : false,
                    error : "The project does not exists"
            });
        }
    }
    catch(e){
        console.log(e);
        res.status(503).json({
            success : false,
            error : "Cannot DELETE project. Please try again later."
        });
    }

});
