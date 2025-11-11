import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/connectDB";
import Post from "../../../../../models/Post";

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await connectDB();

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Post deleted successfully!",
      deletedPost,
    });
  } catch (e) {
    console.error("Error deleting post:", e.message);
    return NextResponse.json(
      { message: "Error occurred while deleting the post", error: e.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { userId } = await req.json();

    await connectDB(); // ensure persistent connection in lib

    // Toggle like in one atomic operation
    const updatedPost =
      (await Post.findOneAndUpdate(
        { _id: id, likes: { $in: [userId] } },
        { $pull: { likes: userId } },
        { new: true }
      )) ||
      (await Post.findByIdAndUpdate(
        id,
        { $addToSet: { likes: userId } },
        { new: true }
      ));

    return NextResponse.json({
      message: "Like toggled successfully",
      likesCount: updatedPost.likes.length,
    });
  } catch (error) {
    console.error("Error in like toggle:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// This API is Used for Single Posts, When we click Show Post, that's when we call this endpoint!
export async function GET(req, { params }) {
  const { id } = await params;

  try {
    await connectDB();
    const post = await Post.findById({ _id: id }).populate("user").lean();

    return NextResponse.json({ OnePost: post });
  } catch (e) {
    console.log("Error From Api/Posts/[id]: ", e.message);
    return NextResponse.json({
      OnePost: {},
      message: "An Error Occured!",
      Error: e.message,
    });
  }
}
