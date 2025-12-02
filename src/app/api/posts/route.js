import { NextResponse } from "next/server";
import connectDB from "../../../../lib/connectDB";
import Post from "@/app/../../models/Post";
import { revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(DATA) {
  const data = await DATA.json();

  try {
    await connectDB();

    if (!data.post || !data.user) {
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

  revalidateTag("allPosts");

  return NextResponse.json({
    message: "Post was Created Successfully!",
    the_post,
  });
}

export async function GET() {
  try {
    await connectDB();
    const allPosts = await Post.find()
      .populate("userId", "name email role")
      .sort({ createdAt: -1 });
    return NextResponse.json(allPosts);
  } catch (e) {
    console.log(e.message);
    return NextResponse.json({ message: "An Error Occured!" });
  }
}

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
