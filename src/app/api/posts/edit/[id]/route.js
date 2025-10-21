import { NextResponse } from "next/server";
import connectDB from "../../../../../../lib/connectDB";
import Post from "../../../../../../models/Post";

export async function PUT(req, { params }) {
  const { id } = await params;
  const { updatedText } = await req.json();
  console.log(" --> EDIT API HIT");
  console.log(" --> Updated Post Send To API", updatedText);

  try {
    await connectDB();
    await Post.findByIdAndUpdate(id, { post: updatedText }, { new: true });

    return NextResponse.json({ message: "Post Edited Succesfully!" });
  } catch (e) {
    console.error(e.message);
    return NextResponse.json({ message: "Error Occured!", error: e.message });
  }
}
