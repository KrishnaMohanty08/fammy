import  mongoose  from "mongoose";

const postSchema=new mongoose.Schema({
      username: {type:String,ref:'User',required:true},
      title:String,
      body: String,
      tags: [ String ],
      reactions: {
        likes: {type:Number,default:0},
        dislikes: {type:Number,default:0},
      },
      views: {type:Number,default:0},
});
const Post =mongoose.models.Post || mongoose.model("Post", postSchema,"posts");

export default Post;