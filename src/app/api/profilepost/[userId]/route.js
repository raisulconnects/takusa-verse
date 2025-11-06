import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/connectDB";
import Post from "../../../../../models/Post";

export async function GET(req, { params }) {
  const { userId } = await params;

  try {
    await connectDB();

    const userPosts = await Post.find({ user: userId }).sort({
      createdAt: -1,
    });

    console.log("Specified User Found!");

    return NextResponse.json({ message: "Users Posts Found!", userPosts });
  } catch (e) {
    console.log(e.message);
    return NextResponse.json({
      message: "Error, Something went wrong!",
      userPosts,
    });
  }
}
