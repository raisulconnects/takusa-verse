"use client";

import { Trash2 } from "lucide-react";
import timeAgo from "../../../lib/timeAgo";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Comment({ comment, commentsUpdater }) {
  const time = timeAgo(comment.createdAt);
  const router = useRouter();
  const { data: session } = useSession();

  const handleDeleteComment = async (id) => {
    try {
      await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      });

      router.refresh();
      commentsUpdater();
    } catch (e) {
      console.log(e.message);
    }
  };

  console.log(session?.user?.role);

  return (
    <div className="flex flex-col gap-2 my-3">
      <div className="bg-white border border-gray-100 rounded-2xl px-4 py-2 shadow-sm hover:shadow-md transition">
        <div className="flex items-center justify-between">
          <div className=" flex items-center gap-2">
            <span className="font-semibold text-pink-700 text-sm">
              {comment.userId.name}
            </span>
            <span className="flex-1  text-gray-500 font-light text-[15px]">
              {time}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {session?.user?.role === "admin" ? (
              <button
                className="text-gray-400 hover:text-red-500 transition p-1 rounded-lg hover:bg-gray-50"
                title="Delete comment"
                onClick={() => {
                  handleDeleteComment(comment._id);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            ) : (
              session?.user?.id == comment?.userId._id && (
                <button
                  className="text-gray-400 hover:text-red-500 transition p-1 rounded-lg hover:bg-gray-50"
                  title="Delete comment"
                  onClick={() => {
                    handleDeleteComment(comment._id);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )
            )}
          </div>
        </div>
        <p className="text-sm text-gray-700 mt-1">{comment.comment}</p>
      </div>
    </div>
  );
}
