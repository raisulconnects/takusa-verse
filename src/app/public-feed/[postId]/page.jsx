"use client";

import React, { useEffect, useState } from "react";
import Post from "@/app/Components/Post";
import CommentSection from "@/app/Components/CommentSection";

export default function ShowPosts({ params }) {
  const { postId } = React.use(params);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/posts/${postId}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setPost(data.OnePost || data);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };

    if (postId) fetchData();
  }, [postId]);

  if (!post) {
    return <p className="text-center text-gray-500 py-20">Loading post...</p>;
  }

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl space-y-10">
        {/* Post */}
        <Post post={post} />

        {/* Comments Section */}
        <div className="bg-white/90 border border-pink-100 rounded-2xl shadow-sm p-6 mt-10">
          <h2 className="text-xl font-semibold text-pink-700 mb-4 text-center sm:text-left">
            Comments
          </h2>
          {Array.isArray(post?.comments) && post.comments.length > 0 ? (
            <CommentSection commentPresent postId={post?._id} />
          ) : (
            <CommentSection commentPresent={false} postId={post?._id} />
          )}
        </div>
      </div>
    </div>
  );
}
