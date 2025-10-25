"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Comment from "@/app/Components/Comment";
import { useRouter } from "next/navigation";

// Eklhane postId tene ana hoise Post Component theke karon amader jana lagbe kon Post er comment section show korba by fetcing that post objhect from mongodb's comments array

// Comment present diye basically Post compononent theke check kore agei boltesi adou post er comment ase kina, cause UI ektu changed

export default function CommentSection({ commentPresent, postId }) {
  const [inputComment, setInputComment] = useState("");
  const [comments, setComments] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchComment = async () => {
      try {
        let res = await fetch(`/api/comments?postId=${postId}`);
        let data = await res.json();
        setComments(data.data);
      } catch (e) {
        console.log("--> Error:", e.message);
      }
    };
    fetchComment();
  }, [postId]);

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

      const res = await fetch(`/api/comments?postId=${postId}`);
      const data = await res.json();
      setComments(data.data);

      setInputComment("");
    } catch (e) {
      console.log(" --> Error:", e.message);
    }
  };

  if (comments.length === 0) {
    return (
      <div className="mt-4 border-t border-gray-200 pt-3">
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
        <p className="text-gray-400 text-sm text-center py-2">
          No comments yet. Be the first!
        </p>
      </div>
    );
  }

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

      {comments?.map((cmnt) => {
        return <Comment key={cmnt._id} comment={cmnt} />;
      })}
    </div>
  );
}
