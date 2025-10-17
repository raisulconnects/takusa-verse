"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostBox() {
  const [post, setPost] = useState("");
  const { data: session } = useSession();

  const nextRouter = useRouter();

  const handlePost = async () => {
    if (!post.trim()) return;

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post, userId: session.user.id, comments: [] }),
      });

      if (!res.ok) throw new Error("Failed to post");

      setPost(""); // clear textarea on success
      nextRouter.refresh();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md max-w-2/4 m-3 mx-auto">
      <textarea
        value={post}
        onChange={(e) => setPost(e.target.value)}
        placeholder="What's on your mind today..."
        className="w-full p-3 border-2 border-pink-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 resize-none transition-all"
        rows={4}
      />
      <div className="flex justify-end mt-4">
        <button
          className="bg-pink-600 text-white px-6 py-2 rounded-2xl font-bold shadow-md hover:bg-pink-700 transition-all disabled:opacity-50"
          disabled={!post.trim()}
          onClick={handlePost}
        >
          Post
        </button>
      </div>
    </div>
  );
}
