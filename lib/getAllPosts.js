import Post from "../models/Post";
import connectDB from "./connectDB";
import User from "../models/User";

export async function getAllPosts() {
  await connectDB();

  const posts = await Post.find()
    .populate("user", "name email role") // ✅ fixed
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(posts));
}
