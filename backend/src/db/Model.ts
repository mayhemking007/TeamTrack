import { model } from "mongoose";
import { CommentSchema, InviteSchema, ProjectSchema, SprintSchema, TaskSchema, TeamMemberSchema, TeamSchema, UserSchema } from "./Schema.js";

export const UserModel = model("user", UserSchema);
export const TeamModel = model("team", TeamSchema);
export const TeamMemberModel = model("teamMember", TeamMemberSchema);
export const ProjectModel = model("project", ProjectSchema);
export const SprintModel = model("sprint", SprintSchema);
export const TaskModel = model("task", TaskSchema);
export const CommentModel = model("comment", CommentSchema);
export const InviteModel = model("invite", InviteSchema);