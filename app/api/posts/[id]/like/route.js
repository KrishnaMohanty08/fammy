import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/data';
import Post from '@/Model/Post';

export async function POST(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $inc: { 'reactions.likes': 1 } },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 });
    }

    return NextResponse.json(
        { message: "Like updated",
         post: updatedPost },
          { status: 200 });

  } catch (error) {
    console.error("Error updating like:", error);
    return NextResponse.json(
        { error: "Failed to update like" },
        { status: 500 });
  }
}
