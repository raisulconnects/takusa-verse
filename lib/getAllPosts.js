import connectDB from "./connectDB";
import Post from "@/models/Post";
import User from "@/models/User"; // ✅ add this line

export async function getAllPosts() {
  await connectDB();
  const posts = await Post.find().populate("user").sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(posts));
}
