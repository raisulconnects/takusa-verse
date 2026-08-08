"use client";

import React, { useEffect, useState } from "react";
import Post from "@/app/Components/Post";
import CommentSection from "@/app/Components/CommentSection";
import Link from "next/link";
import { ArrowLeft, MessageSquare, Loader2 } from "lucide-react";

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
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
        <div className="bg-white/80 border border-slate-200/60 p-8 rounded-3xl animate-pulse space-y-4 max-w-2xl w-full shadow-xs">
          <div className="h-6 bg-slate-200 rounded-full w-1/4" />
          <div className="h-5 bg-slate-200 rounded-lg w-3/4" />
          <div className="h-44 bg-slate-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Back Link */}
        <Link
          href="/public-feed"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200/80 text-slate-700 text-xs sm:text-sm font-bold shadow-xs hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Feed</span>
        </Link>

        {/* Post Card */}
        <Post post={post} />

        {/* Dedicated Comments Card */}
        <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-5 h-5 text-rose-500" />
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Discussion & Comments
            </h2>
          </div>

          <CommentSection postId={post?._id} />
        </div>
      </div>
    </div>
  );
}

