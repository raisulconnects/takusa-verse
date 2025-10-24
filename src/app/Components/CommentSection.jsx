"use client";

import { useState } from "react";
import connectDB from "../../../lib/connectDB";
import { useSession } from "next-auth/react";

// Eklhane postId tene ana hoise Post Component theke karon amader jana lagbe kon Post er comment section show korba by fetcing that post objhect from mongodb's comments array

export default function CommentSection({ postId }) {
  const [inputComment, setInputComment] = useState("");
  const { data: session } = useSession();

  const handleCommentPost = async () => {
    if (inputComment.trim() === "") return;

    try {
      await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          comment: inputComment,
          postId: postId,
        }),
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="mt-4 border-t border-gray-200 pt-3">
      {/* comment input box */}
      <div className="flex items-center gap-3 mb-3 bg-gray-50 rounded-2xl px-3 py-2 shadow-inner">
        <input
          value={inputComment}
          onChange={(e) => {
            setInputComment(e.target.value);
          }}
          type="text"
          placeholder="Write a comment..."
          className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400"
        />
        <button
          className="bg-pink-600 text-white text-sm px-4 py-1.5 rounded-xl hover:bg-pink-700 transition"
          onClick={handleCommentPost}
        >
          Post
        </button>
      </div>

      {/* comments list */}
      <div className="flex flex-col gap-2">
        {/* comment item */}
        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-2 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-pink-700 text-sm">
              John Doe
            </span>
            <span className="text-xs text-gray-400">Oct 23</span>
          </div>
          <p className="text-sm text-gray-700 mt-1">This looks awesome 🔥</p>
        </div>

        {/* <div className="bg-white border border-gray-100 rounded-2xl px-4 py-2 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-pink-700 text-sm">Alice</span>
            <span className="text-xs text-gray-400">Oct 22</span>
          </div>
          <p className="text-sm text-gray-700 mt-1">
            Love the design! Keep it up 💪
          </p>
        </div> */}

        {/* no comments message (if empty) */}
        {/* <p className="text-gray-400 text-sm text-center py-2">
          No comments yet. Be the first!
        </p> */}
      </div>
    </div>
  );
}
