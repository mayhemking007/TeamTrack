import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { authRouter } from "./routes/auth.js";
import { teamRouter } from "./routes/team.js";
import { projectRouter } from "./routes/project.js";
import { sprintRouter } from "./routes/sprint.js";

dotenv.config();
const app = express();

app.use('/auth', authRouter);
app.use('/teams', teamRouter);
app.use('/projects', projectRouter);
app.use('/sprints', sprintRouter)
async function main(){
    await mongoose.connect(process.env.DB_URL as string);
    app.listen(3000, () => console.log("Server is listening at port 3000"))
}
main();
