"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import timeAgo from "../../../lib/timeAgo";
import { useEffect, useRef, useState } from "react";
import CommentSection from "./CommentSection";
import AdminName from "./AdminName";
import Link from "next/link";
import Image from "next/image";
import { useFeedProvider } from "../Providers/FeedProvider";
import { Heart, MessageSquare, Clock, Pencil, Trash2, Check, AlertTriangle, X, Maximize2 } from "lucide-react";

export default function Post({ post }) {
  const { triggerRefreseh } = useFeedProvider();
  const { data } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(post.post);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const confirmTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (confirmTimer.current) clearTimeout(confirmTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  // 🪄 Optimistic UI states
  const [optimisticLikes, setOptimisticLikes] = useState(post.likes.length);
  const [optimisticIsLiked, setOptimisticIsLiked] = useState(
    post.likes.includes(data?.user?.id)
  );

  const handleDelete = async (postid) => {
    try {
      await fetch(`/api/posts/${postid}`, {
        method: "DELETE",
      });
      triggerRefreseh();
      router.refresh();
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleDeleteClick = (postid) => {
    if (!confirmingDelete) {
      setConfirmingDelete(true);
      confirmTimer.current = setTimeout(() => setConfirmingDelete(false), 3000);
      return;
    }
    if (confirmTimer.current) clearTimeout(confirmTimer.current);
    setConfirmingDelete(false);
    handleDelete(postid);
  };

  const handleLike = async (postid) => {
    if (!data?.user?.id) return; // user must be logged in

    // 1️⃣ Instantly update UI
    setOptimisticIsLiked((prev) => !prev);
    setOptimisticLikes((prev) => (optimisticIsLiked ? prev - 1 : prev + 1));

    try {
      // 2️⃣ Send actual request
      const res = await fetch(`/api/posts/${postid}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userId: data.user.id }),
      });

      if (!res.ok) {
        // 3️⃣ Rollback if failed
        setOptimisticIsLiked((prev) => !prev);
        setOptimisticLikes((prev) => (optimisticIsLiked ? prev + 1 : prev - 1));
      }
    } catch (e) {
      // 3️⃣ Rollback if error
      setOptimisticIsLiked((prev) => !prev);
      setOptimisticLikes((prev) => (optimisticIsLiked ? prev + 1 : prev - 1));
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
      triggerRefreseh();
      router.refresh();
    } catch (e) {
      console.log(e.message);
    }
  };

  let postDateTime = timeAgo(post.createdAt);
  const userName = post?.user?.name || "Anonymous";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <article className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 max-w-2xl mx-auto mt-6 group">
      {/* Author & Header Bar */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar Pill */}
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center text-white text-xs font-extrabold shadow-sm shadow-rose-500/20">
            {userInitials}
          </div>
          <div className="flex flex-col">
            <AdminName
              role={post?.user?.role}
              name={userName}
              className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base tracking-tight"
            />
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              <Clock className="w-3 h-3 text-slate-500 dark:text-slate-400" />
              <span>{postDateTime}</span>
            </div>
          </div>
        </div>

        {/* Reaction Pill Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 dark:bg-rose-950/50 border border-rose-100 dark:border-rose-900/50 rounded-full text-xs font-bold text-rose-700 dark:text-rose-300">
          <Heart className={`w-3.5 h-3.5 ${optimisticLikes > 0 ? "fill-rose-500 text-rose-500" : "text-rose-400"}`} />
          <span>{optimisticLikes} {optimisticLikes === 1 ? "Like" : "Likes"}</span>
        </div>
      </div>

      {/* Post Title */}
      {post.title && (
        <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight leading-snug break-words">
          {post.title}
        </h2>
      )}

      {/* Display image if present */}
      {post.imageUrl && (
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="relative w-full rounded-2xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-800 shadow-xs cursor-zoom-in group/image"
          title="Click to enlarge"
        >
          <Image
            src={post.imageUrl}
            alt="Post Image"
            width={800}
            height={450}
            className="w-full h-auto max-h-[480px] object-cover group-hover/image:scale-[1.01] transition-transform duration-300"
          />
          <div className="absolute inset-0 flex items-end justify-end p-3 opacity-0 group-hover/image:opacity-100 transition-opacity duration-200">
            <div className="p-2 rounded-xl bg-black/50 backdrop-blur-sm text-white shadow-lg">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>
        </button>
      )}

      {/* Image Modal (portal to body so it covers the whole viewport) */}
      {lightboxOpen &&
        post.imageUrl &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setLightboxOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Post image"
          >
            <div
              className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Image Preview
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/50 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-3 sm:p-5 bg-slate-100/70 dark:bg-slate-950/40">
                <img
                  src={post.imageUrl}
                  alt="Post Image"
                  className="w-full max-h-[70vh] object-contain rounded-2xl"
                />
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Post Content */}
      {isEditing ? (
        <div className="mb-4">
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full p-4 border border-rose-300 dark:border-slate-700 rounded-2xl bg-rose-50/50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 shadow-inner transition-all duration-200 resize-none text-sm font-medium"
            rows={3}
          />
        </div>
      ) : (
        <p className="text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed mb-4 pl-3 border-l-2 border-rose-400 dark:border-rose-500 font-medium whitespace-pre-line">
          {post.post}
        </p>
      )}

      {/* Action Buttons Bar */}
      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
        {/* Like Button */}
        <button
          className={`flex-1 min-w-[90px] py-2 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer active:scale-95 shadow-xs ${
            optimisticIsLiked
              ? "bg-rose-600 text-white shadow-rose-500/20 hover:bg-rose-700"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-slate-700 hover:text-rose-600 dark:hover:text-rose-400"
          }`}
          onClick={() => handleLike(post._id)}
        >
          <Heart className={`w-4 h-4 ${optimisticIsLiked ? "fill-white" : ""}`} />
          <span>{optimisticIsLiked ? "Liked" : "Like"}</span>
        </button>

        {/* Show Post / Details Button */}
        <button
          onClick={() => {
            router.push(`/public-feed/${post._id}`);
          }}
          className="flex-1 min-w-[110px] py-2 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 text-white hover:bg-slate-800 transition-all duration-200 shadow-xs cursor-pointer active:scale-95 border dark:border-slate-700"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Comments</span>
        </button>

        {/* Edit Button */}
        {isEditing ? (
          <button
            className="py-2 px-4 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
            onClick={() => {
              if (editedText === post.post) {
                setIsEditing(false);
                return;
              }
              handleEdit(post._id);
              setIsEditing(false);
            }}
          >
            <Check className="w-4 h-4" />
            <span>Save</span>
          </button>
        ) : post?.user?._id === data?.user?.id ? (
          <button
            className="py-2 px-3 rounded-xl font-semibold text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        ) : null}

        {/* Delete Button */}
        {post?.user?._id === data?.user?.id && data?.user?.role !== "admin" && (
          <button
            className={`py-2 px-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
              confirmingDelete
                ? "bg-rose-600 text-white shadow-md shadow-rose-500/30 hover:bg-rose-700"
                : "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60"
            }`}
            onClick={() => handleDeleteClick(post._id)}
          >
            {confirmingDelete ? (
              <AlertTriangle className="w-3.5 h-3.5" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
            <span>{confirmingDelete ? "Click again to confirm" : "Delete"}</span>
          </button>
        )}

        {/* Admin Delete Button */}
        {data?.user?.role === "admin" && (
          <button
            className={`py-2 px-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
              confirmingDelete
                ? "bg-rose-600 text-white shadow-md shadow-rose-500/30 hover:bg-rose-700"
                : "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-900"
            }`}
            onClick={() => handleDeleteClick(post._id)}
          >
            {confirmingDelete ? (
              <AlertTriangle className="w-3.5 h-3.5" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
            <span>{confirmingDelete ? "Click again to confirm" : "Admin Delete"}</span>
          </button>
        )}
      </div>
    </article>
  );
}


