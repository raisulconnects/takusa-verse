import Post from "../models/Post";
import connectDB from "./connectDB";
import User from "../models/User";

export async function getAllPosts() {
  await connectDB();

  // Fetch posts from MongoDB, newest first
  const posts = await Post.find()
    .populate("userId", "name email role")
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(posts));
}
