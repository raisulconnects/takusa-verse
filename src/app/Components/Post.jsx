"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import timeAgo from "../../../lib/timeAgo";
import { useState } from "react";

// export default function Post({ author, content, likes }) {

export default function Post({ post }) {
  const { data } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(post.post);
  // console.log(data.user.role);
  // console.log(data?.user?.id);
  // console.log(post?.userId._id === data?.user?.id);
  // post?.userId ==  data?.user?.id

  const postIsLiked = post.likes.includes(data?.user?.id);

  const handleDelete = async (postid) => {
    try {
      await fetch(`/api/posts/${postid}`, {
        method: "DELETE",
      });
      router.refresh();
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleLike = async (postid) => {
    try {
      await fetch(`/api/posts/${postid}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userId: data.user.id }),
      });
      router.refresh();
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleEdit = async function (postid) {
    try {
      await fetch(`/api/posts/edit/${postid}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ updatedText: editedText }),
      });

      router.refresh();
    } catch (e) {
      console.log(e.message);
    }
  };

  let postDateTime = timeAgo(post.createdAt);

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-pink-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 max-w-2xl mx-auto mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 gap-1.5">
        <span className="font-semibold text-pink-700 text-lg tracking-tight ">
          {post.userId.name}
        </span>
        <span className="flex-1  text-pink-400 text-sm tracking-tight ">
          {postDateTime}
        </span>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="bg-pink-50 px-3 py-1 rounded-full shadow-inner">
            👍 {post.likes.length} Likes
          </span>
        </div>
      </div>

      {/* Post Content */}
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => {
            setEditedText(e.target.value);
          }}
        />
      ) : (
        <p className="text-gray-800 text-base leading-relaxed border-l-4 border-pink-200 pl-3">
          {post.post}
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          className={`flex-1 py-2 rounded-xl font-medium w-1/5 transition-all duration-200 shadow-sm 
          ${
            postIsLiked
              ? "bg-pink-500 text-white hover:bg-pink-700"
              : "bg-pink-200 text-pink-700 hover:bg-pink-300"
          }`}
          onClick={() => handleLike(post._id)}
        >
          {postIsLiked ? "Liked" : "Like"}
        </button>
        {isEditing ? (
          <button
            className="flex-1 py-2 rounded-xl font-medium bg-red-100 text-red-600 hover:bg-red-200 shadow-sm transition-all duration-200"
            onClick={() => {
              if (editedText === post.post) {
                setIsEditing(false);
                return;
              }
              handleEdit(post._id);
              setIsEditing(false);
            }}
          >
            Save
          </button>
        ) : post?.userId._id === data?.user?.id ? (
          <button
            className="flex-1 py-2 rounded-xl font-medium bg-red-100 text-red-600 hover:bg-red-200 shadow-sm transition-all duration-200"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </button>
        ) : (
          ""
        )}

        {/* This is for particular user's own post deleting */}
        {post?.userId._id === data?.user?.id && (
          <button
            className="flex-1 py-2 rounded-xl font-medium bg-red-100 text-red-600 hover:bg-red-200 shadow-sm transition-all duration-200"
            onClick={() => handleDelete(post._id)}
          >
            Delete
          </button>
        )}

        {/* THis is for admin delete so admin can delete any post */}
        {data?.user?.role === "admin" && (
          <button
            className="flex-1 py-2 rounded-xl font-medium bg-red-100 text-red-600 hover:bg-red-200 shadow-sm transition-all duration-200"
            onClick={() => handleDelete(post._id)}
          >
            ADMIN Delete
          </button>
        )}
      </div>
    </div>
  );
}
