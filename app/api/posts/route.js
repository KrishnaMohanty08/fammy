import connectToDatabase from '@/lib/data'
import Post from "@/Model/Post"
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        await connectToDatabase();
        const posts = await Post.find();
        // console.log(posts)
        return NextResponse.json({ posts }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to fetch posts" },
            { status: 500 }
        );
    }
}
export async function POST(request) {
    try {
        await connectToDatabase();
        const body = await request.json()

        const newPost = new Post({
            title: body.title,
            body: body.discription,
            tags: body.tags,
            reactions: {
                likes: 0,
                dislikes: 0,
            },
            views: 0,
            userId: 1,
        });
        const savedPost=await newPost.save();
        return NextResponse.json(
            {success:true,post:savedPost},
            {status:200},
        )

    } catch (error) {
        console.log("error in server" + error);
        return NextResponse.json(
            { error: "failed to submit the new post" },
            { status: 500 }
        )
    }
}