import connectDB from "@/../lib/connectDB";
import Post from "@/../models/Post";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const skip = parseInt(searchParams.get("skip")) || 0;
    const limit = parseInt(searchParams.get("limit")) || 5;

    const posts = await Post.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return Response.json({
      posts,
      hasMore: posts.length === limit, // If returned less than limit → no more posts
    });
  } catch (err) {
    console.error("Feed API error:", err);
    return Response.json({ error: "Failed to load feed" }, { status: 500 });
  }
}
