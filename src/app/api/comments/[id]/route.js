import { NextResponse } from "next/server";
import Comment from "../../../../../models/Comment";
import connectDB from "../../../../../lib/connectDB";
import { revalidateTag } from "next/cache";

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    await Comment.findByIdAndDelete(id);

    revalidateTag("allPosts");
    return NextResponse.json({ message: "Comment Deleted Successfully!" });
  } catch (e) {
    console.log(e.message);
    return NextResponse.json({
      message: "Something went wrong",
      error: e.message,
    });
  }
}
