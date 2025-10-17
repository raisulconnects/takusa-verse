import { NextResponse } from "next/server";
import connectDB from "../../../../lib/connectDB";
import Post from "@/app/../../models/Post";

export async function POST(DATA) {
  const data = await DATA.json();

  try {
    await connectDB();

    if (!data.post || !data.userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    var the_post = await Post.create(data);
  } catch (e) {
    console.log(e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }

  return NextResponse.json({
    message: "Post was Created Successfully!",
    the_post,
  });
}

export async function GET() {
  try {
    await connectDB();
    const allPosts = await Post.find().populate("userId", "name email role");
    return NextResponse.json(allPosts);
  } catch (e) {
    console.log(e.message);
    return NextResponse.json({ message: "An Error Occured!" });
  }
}
