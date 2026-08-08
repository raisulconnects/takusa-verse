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

  const commenterName = comment?.userId?.name || "User";
  const initials = commenterName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const isOwnerOrAdmin =
    session?.user?.role === "admin" || session?.user?.id == comment?.userId?._id;

  return (
    <div className="flex gap-2.5 my-2.5 group">
      {/* Avatar */}
      <div className="w-7 h-7 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
        {initials}
      </div>

      {/* Bubble */}
      <div className="flex-1 bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700 rounded-2xl px-3.5 py-2 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-slate-100 text-xs tracking-tight">
              {commenterName}
            </span>
            <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
              {time}
            </span>
          </div>

          {isOwnerOrAdmin && (
            <button
              className="text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-slate-700 opacity-80 group-hover:opacity-100 cursor-pointer"
              title="Delete comment"
              onClick={() => handleDeleteComment(comment._id)}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 mt-1 leading-relaxed font-medium">
          {comment.comment}
        </p>
      </div>
    </div>
  );
}


