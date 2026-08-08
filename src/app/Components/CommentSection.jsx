"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Comment from "@/app/Components/Comment";
import { Send, Loader2, MessageSquare } from "lucide-react";

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

  const userName = session?.user?.name || "User";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  // 🔹 Skeleton loader while fetching
  if (loading) {
    return (
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 animate-pulse space-y-3">
        <div className="flex items-center gap-3 bg-slate-100/70 dark:bg-slate-800/70 p-2.5 rounded-2xl">
          <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full shrink-0" />
          <div className="flex-1 h-8 bg-slate-200 dark:bg-slate-700 rounded-xl" />
        </div>
        <div className="space-y-2 pt-2">
          <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-2xl w-full" />
          <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-2xl w-4/5" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
      {/* 🔹 Comment input box */}
      <div className="flex items-center gap-2.5 mb-4 p-1.5 pl-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 rounded-2xl focus-within:ring-2 focus-within:ring-rose-500/20 focus-within:border-rose-500 focus-within:bg-white dark:focus-within:bg-slate-800 transition-all shadow-xs">
        <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center text-white text-[10px] font-extrabold shrink-0">
          {userInitials}
        </div>
        <input
          value={inputComment}
          onChange={(e) => setInputComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleCommentPost();
            }
          }}
          type="text"
          placeholder="Write a comment..."
          className="flex-1 min-w-0 bg-transparent outline-none text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 font-medium"
        />
        <button
          className="bg-slate-900 dark:bg-rose-600 hover:bg-rose-600 dark:hover:bg-rose-700 text-white text-xs px-3.5 py-2 rounded-xl font-bold transition-all duration-200 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shrink-0"
          onClick={handleCommentPost}
          disabled={posting || !inputComment.trim()}
        >
          {posting ? (
            <>
              <span>Posting</span>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            </>
          ) : (
            <>
              <span>Post</span>
              <Send className="w-3 h-3" />
            </>
          )}
        </button>
      </div>

      {/* 🔹 Comments list or empty message */}
      {comments.length === 0 ? (
        <div className="text-center py-6 px-4 bg-slate-50/50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
          <MessageSquare className="w-6 h-6 text-slate-300 dark:text-slate-600 mx-auto mb-1" />
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">No comments yet</p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-1">
          {comments.map((cmnt) => (
            <Comment
              key={cmnt._id}
              comment={cmnt}
              commentsUpdater={async () => {
                const res = await fetch(`/api/comments?postId=${postId}`);
                const data = await res.json();
                setComments(Array.isArray(data.data) ? data.data : []);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}


