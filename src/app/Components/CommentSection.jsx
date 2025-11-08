"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Comment from "@/app/Components/Comment";

export default function CommentSection({ postId }) {
  const { data: session } = useSession();
  const [inputComment, setInputComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true); // handles initial fetch
  const [posting, setPosting] = useState(false); // handles comment posting

  // 🔹 Fetch comments on mount or postId change
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments?postId=${postId}`, {
          cache: "no-store",
        });
        const data = await res.json();
        setComments(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error("❌ Fetch Comments Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [postId]);

  // 🔹 Post a new comment
  const handleCommentPost = async () => {
    if (!inputComment.trim()) return;
    if (!session?.user?.id) return alert("You must be logged in!");

    try {
      setPosting(true);
      await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          comment: inputComment,
          postId,
        }),
      });

      // Refresh comments after posting
      const res = await fetch(`/api/comments?postId=${postId}`);
      const data = await res.json();
      setComments(Array.isArray(data.data) ? data.data : []);
      setInputComment("");
    } catch (err) {
      console.error("❌ Post Comment Error:", err);
    } finally {
      setPosting(false);
    }
  };

  // 🔹 Skeleton loader while fetching
  if (loading) {
    return (
      <div className="mt-4 border-t border-gray-200 pt-3 animate-pulse">
        <div className="flex items-center gap-3 mb-3 bg-gray-50 rounded-2xl px-3 py-2 shadow-inner">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div className="flex-1 h-4 bg-gray-200 rounded" />
          <div className="w-16 h-6 bg-gray-200 rounded-xl" />
        </div>
        <div className="space-y-2 mt-3">
          <div className="h-3 bg-gray-200 rounded w-2/3" />
          <div className="h-3 bg-gray-200 rounded w-1/3" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 border-t border-gray-200 pt-3">
      {/* 🔹 Comment input box */}
      <div className="flex items-center gap-3 mb-3 bg-gray-50 rounded-2xl px-3 py-2 shadow-inner">
        <input
          value={inputComment}
          onChange={(e) => setInputComment(e.target.value)}
          type="text"
          placeholder="Write a comment..."
          className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400"
        />
        <button
          className={`${
            posting ? "bg-pink-400" : "bg-pink-600 hover:bg-pink-700"
          } text-white text-sm px-4 py-1.5 rounded-xl transition`}
          onClick={handleCommentPost}
          disabled={posting}
        >
          {posting ? "Posting..." : "Post"}
        </button>
      </div>

      {/* 🔹 Comments list or empty message */}
      {comments.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-2">
          No comments yet. Be the first!
        </p>
      ) : (
        comments.map((cmnt) => (
          <Comment
            key={cmnt._id}
            comment={cmnt}
            commentsUpdater={async () => {
              const res = await fetch(`/api/comments?postId=${postId}`);
              const data = await res.json();
              setComments(Array.isArray(data.data) ? data.data : []);
            }}
          />
        ))
      )}
    </div>
  );
}
