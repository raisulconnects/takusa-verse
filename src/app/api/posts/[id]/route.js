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
  const { id } = await params;
  const { userId } = await req.json();

  try {
    await connectDB();

    const post = await Post.findById(id);

    if (!post) throw new Error("Post not Found!");

    if (post.likes.includes(userId)) {
      await Post.findByIdAndUpdate(
        id,
        { $pull: { likes: userId } },
        { new: true }
      );
    } else {
      await Post.findByIdAndUpdate(
        id,
        { $push: { likes: userId } },
        { new: true }
      );
    }
    // console.log("Post Got Liked!");
    // console.log("User ID --> ", userId);

    return NextResponse.json({ message: "Like Operation Done Successfully!" });
  } catch (e) {
    console.error(e.message);
    return NextResponse.json({ message: e.message, status: 500 });
  }
}
