import connectToDatabase from "@/lib/data";
import User from '@/Model/User'

export async function PUT(request){
    await connectToDatabase();
    const {userId,username}=await request.json();
    try {
    await User.updateOne(
      { _id: userId },
      { username, bio, updatedAt: new Date() },
      { upsert: true }
    );
    return new Response(JSON.stringify({ message: 'Profile updated' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

}   