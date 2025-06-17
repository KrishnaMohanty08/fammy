import mongoose  from "mongoose";

const userSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    githubId:{type:String,unique:true},
    email:{type:String,unique:true},
    createdAt:{type:Date,default:Date.now()}
});

module.exports=mongoose.models.User||mongoose.model('User',userSchema);