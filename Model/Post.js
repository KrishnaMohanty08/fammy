import  mongoose  from "mongoose";

const postSchema=new mongoose.Schema({
      id:Number ,
      title:String,
      body: String,
      tags: [ String ],
      reactions: {
        likes: {type:Number},
        dislikes: {type:Number},
      },
      views: Number,
      username: String,
});
const Post =mongoose.models.Post || mongoose.model("Post", postSchema,"posts");

export default Post;