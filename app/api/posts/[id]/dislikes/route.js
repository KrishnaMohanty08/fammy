import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/data";
import Post from "@/Model/Post";

export async function POST(request,{params}){
    
    try{
        await connectToDatabase()
        let {id}=await params;
        let updatedDisLikes = await Post.findByIdAndUpdate(
            id,
            {$inc:{'reactions.dislikes':1}},
            {new:true}
        )
            if (!updatedDisLikes) {
              return NextResponse.json(
                { error: "Post not found" },
                { status: 404 });
            }
        console.log(updatedDisLikes);
        return NextResponse.json(
            {message:"updated dislikes",post: updatedDisLikes},
            {status:200}
        )

    }catch(error){
        console.log(error);
        return NextResponse.json({message:"error updating dislikes"},{
            status:500
        })
    }
}