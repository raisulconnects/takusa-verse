import Post from "../models/Post";
import connectDB from "./connectDB";

export async function getAllPosts() {
  await connectDB();

  // Fetch posts from MongoDB, newest first
  const posts = await Post.find().sort({ createdAt: -1 }).lean();

  // Convert to plain JS objects (safe for JSON)
  return JSON.parse(JSON.stringify(posts));
}
