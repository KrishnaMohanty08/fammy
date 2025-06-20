// app/api/posts/route.js
import connectToDatabase from '@/lib/data';
import Post from '@/Model/Post';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectToDatabase();
    const posts = await Post.find().populate('userId', 'username').sort({ createdAt: -1 }).lean();
    console.log("posts visible");
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request) {
  await connectToDatabase();
  const { userId, title, body, tags } = await request.json();
  try {
    const objectIdUserId = new mongoose.Types.ObjectId(userId); // Fixed typo
    const newPost = new Post({
      userId: objectIdUserId,
      title,
      body,
      tags: tags ? [tags] : [], // Handle single tag or array
      reactions: { likes: 0, dislikes: 0 },
      views: 0,
    });
    const savedPost = await newPost.save();
    console.log(newPost);
    return NextResponse.json({ success: true, post: savedPost }, { status: 200 });
  } catch (error) {
    console.error('Error in server:', error);
    return NextResponse.json({ error: 'Failed to submit the new post' }, { status: 500 });
  }
}