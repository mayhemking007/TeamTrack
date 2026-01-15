import { Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

export const UserSchema = new Schema({
    username : String,
    email : {type : String, unique : true},
    name : String,
    password : String,
});
export const TeamSchema = new Schema({
    name : String,
    status : String,
    createdBy : {type : ObjectId, ref : "user"},
});
export const TeamMemberSchema = new Schema({
    teamId : {type : ObjectId, ref : "team"},
    userId : {type : ObjectId, ref : "user"},
    role : String
});
export const ProjectSchema = new Schema({
    name : String,
    teamId : {type : ObjectId, ref : "team"},
    status : String,
})
export const SprintSchema = new Schema({
    name : String,
    projectId : {type : ObjectId, ref : "project"},
    startedAt : Date,
    endDate : Date,
    status : String,
})
export const TaskSchema = new Schema({
    title : String,
    description : String,
    assignedBy : {type : ObjectId, ref : "teamMember"},
    priority : String,
    assignedTo : {type : ObjectId, ref : "teamMember"},
    status : String,
    sprintId : {type : ObjectId, ref : "sprint"},
    projectId : {type : ObjectId, ref : "project"},
    teamId : {type : ObjectId, ref : "team"},
})
export const CommentSchema = new Schema({
    content : String,
    createdAt : Date,
    taskId : {type : ObjectId, ref : "task"},
    commentedBy : {type : ObjectId, ref : "teamMember"}
})
export const InviteSchema = new Schema({
    token : String,
    email : String, 
    status : String,
    teamId : {type : ObjectId, ref : "team"},
    expriesAt : Date
})