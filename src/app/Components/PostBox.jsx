"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostBox() {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState(""); // ✅ added: state for title
  const [showTitle, setShowTitle] = useState(false); // ✅ added: toggle state
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const nextRouter = useRouter();

  const handlePost = async () => {
    if (!post.trim()) return;

    try {
      setLoading(true);
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post,
          title: showTitle ? title : "",
          user: session.user.id,
          comments: [],
        }),
      });

      if (!res.ok) throw new Error("Failed to post");

      setPost("");
      setTitle("");
      setLoading(false);
      nextRouter.refresh();
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  };

  return (
    // ✅ Responsive wrapper updated
    <div className="bg-white p-5 rounded-2xl shadow-md w-full max-w-2xl sm:max-w-3xl lg:max-w-2/4 m-3 mx-auto">
      {/* ✅ Conditional title textarea */}
      {showTitle && (
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a catchy title..."
          className="w-full p-3 mb-3 border-2 border-pink-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 resize-none transition-all text-base sm:text-lg"
          rows={2}
          maxLength={150}
        />
      )}

      <textarea
        value={post}
        onChange={(e) => setPost(e.target.value)}
        placeholder="What's on your mind today..."
        className="w-full p-3 border-2 border-pink-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 resize-none transition-all text-base sm:text-lg"
        rows={3}
        maxLength={350}
      />

      {/* ✅ Button container responsive */}
      <div className="flex flex-col sm:flex-row justify-end mt-4 gap-3 sm:gap-2">
        <button
          type="button"
          onClick={() => setShowTitle((prev) => !prev)}
          className={`px-5 py-2 rounded-2xl font-semibold border-2 transition-all text-sm sm:text-base ${
            showTitle
              ? "bg-pink-200 border-pink-400 text-pink-700"
              : "bg-white border-pink-300 text-pink-600 hover:bg-pink-100"
          }`}
        >
          {showTitle ? "Remove Title" : "Add Title"}
        </button>

        <button
          className="bg-pink-600 text-white px-6 py-2 rounded-2xl font-bold shadow-md hover:bg-pink-700 transition-all disabled:opacity-50 text-sm sm:text-base"
          disabled={!post.trim() || loading}
          onClick={handlePost}
        >
          Post
        </button>
      </div>
    </div>
  );
}
