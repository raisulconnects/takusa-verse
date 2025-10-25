import { NextResponse } from "next/server";
import connectDB from "../../../../lib/connectDB";
import Comment from "../../../../models/Comment";
import Post from "../../../../models/Post";

export async function POST(req, params) {
  const data = await req.json();

  try {
    await connectDB();

    let newComment = await Comment.create({
      userId: data.userId,
      comment: data.comment,
      postId: data.postId,
    });

    console.log("--> /api/comments POST HIT -> Comment Created");

    await Post.findByIdAndUpdate(data.postId, {
      $push: { comments: newComment },
    });

    console.log("--> /api/comments POST HIT -> Post Array Was Updated");

    return NextResponse.json({
      message: "Comment and Post Updated!",
      comment: newComment,
    });
  } catch (e) {
    console.log(e.message);
    return NextResponse.json({ message: "Error Occured", error: e.message });
  }
}

export async function GET(req, params) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  console.log("--> Comment GET API Being HIT!");

  try {
    await connectDB();

    const allComments = await Comment.find({
      postId,
    })
      .populate("userId", "name role")
      .sort({ createdAt: -1 });

    return NextResponse.json({ data: allComments });
  } catch (e) {
    console.log(e.message);
    return NextResponse.json({ message: "Something went wrong" });
  }
}
