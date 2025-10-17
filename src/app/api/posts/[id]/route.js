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
