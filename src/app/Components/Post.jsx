"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// export default function Post({ author, content, likes }) {

export default function Post({ post }) {
  const { data } = useSession();
  const router = useRouter();
  // console.log(data.user.role);
  // console.log(data?.user?.id);

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

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4 max-w-2/4 mx-auto mt-5">
      <div className="flex items-center justify-between">
        <span className="font-bold text-pink-700">{post.userId.name}</span>
        <div className="flex items-center gap-2">
          <span className="text-gray-700">{post.likes.length} Likes</span>
        </div>
      </div>

      <p className="text-gray-800">{post.post}</p>
      <div className="flex gap-2">
        <button
          className="bg-pink-100 text-pink-700 px-3 py-1 w-1/5 rounded-2xl shadow-sm hover:bg-pink-200 transition-all"
          onClick={() => {
            handleLike(post._id);
          }}
        >
          Like
        </button>
        {data?.user?.role === "admin" && (
          <button
            className="bg-red-100 text-pink-700 px-3 py-1 w-1/5 rounded-2xl shadow-sm hover:bg-red-200 transition-all"
            onClick={() => {
              handleDelete(post._id);
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
