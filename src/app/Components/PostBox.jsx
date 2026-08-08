"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, X, Image as ImageIcon, Type, Send, Sparkles } from "lucide-react";
import { useFeedProvider } from "../Providers/FeedProvider";

export default function PostBox() {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [showTitle, setShowTitle] = useState(false);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const { triggerRefreseh } = useFeedProvider();

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const nextRouter = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const uploadToCloudinary = async () => {
    if (!imageFile) return null;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "takusa_blog");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dh5r86rqw/image/upload",
        { method: "POST", body: formData }
      );

      const data = await res.json();
      setUploading(false);
      return data.secure_url;
    } catch (err) {
      console.error("Image upload failed:", err);
      setUploading(false);
      return null;
    }
  };

  const handlePost = async () => {
    if (!post.trim()) return;

    try {
      setLoading(true);

      let uploadedUrl = null;
      if (imageFile) uploadedUrl = await uploadToCloudinary();

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post,
          title: showTitle ? title : "",
          user: session.user.id,
          comments: [],
          imageUrl: uploadedUrl,
        }),
      });

      if (!res.ok) throw new Error("Failed to post");

      setPost("");
      setTitle("");
      setImageFile(null);
      setImagePreview(null);

      setLoading(false);
      nextRouter.refresh();
      triggerRefreseh();
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  };

  const userName = session?.user?.name || "User";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md shadow-slate-900/5 max-w-2xl mx-auto my-6 transition-all">
      {/* User Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center text-white text-sm font-extrabold shadow-sm shadow-rose-500/20">
          {userInitials}
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">{userName}</h3>
          <p className="text-xs font-semibold text-rose-500 dark:text-rose-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 fill-current" />
            Create a story
          </p>
        </div>
      </div>

      {/* OPTIONAL TITLE TEXTAREA */}
      {showTitle && (
        <div className="mb-3 relative animate-fade-in">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a catchy title..."
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-base"
            maxLength={150}
          />
          <span className="absolute right-3 top-2.5 text-[10px] font-medium text-slate-400 dark:text-slate-500">
            {title.length}/150
          </span>
        </div>
      )}

      {/* MAIN POST TEXTAREA */}
      <div className="relative">
        <textarea
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder="What's on your mind today..."
          className="w-full p-4 bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 focus:bg-white dark:focus:bg-slate-800 resize-none transition-all text-sm sm:text-base font-medium min-h-[110px]"
          rows={3}
          maxLength={600}
        />
        <span className="absolute right-3 bottom-3 text-[10px] font-medium text-slate-400 dark:text-slate-500">
          {post.length}/600
        </span>
      </div>

      {/* IMAGE PREVIEW BOX */}
      {imagePreview && (
        <div className="relative mt-3 inline-block group">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-36 h-36 object-cover rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute -top-2 -right-2 p-1.5 bg-slate-900/90 text-white rounded-full hover:bg-rose-600 transition-colors shadow-md cursor-pointer"
            title="Remove Image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ACTIONS TOOLBAR */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 gap-2">
        <div className="flex items-center gap-2">
          {/* Upload Image Button */}
          <label
            htmlFor="imageUpload"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-800 transition-all cursor-pointer border border-transparent hover:border-rose-200 dark:hover:border-slate-700"
          >
            <ImageIcon className="w-4 h-4 text-rose-500" />
            <span>{imageFile ? "Change Photo" : "Add Photo"}</span>
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {/* Toggle Title Button */}
          <button
            type="button"
            onClick={() => setShowTitle((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              showTitle
                ? "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                : "text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-800"
            }`}
          >
            <Type className="w-4 h-4" />
            <span>{showTitle ? "Remove Title" : "Add Title"}</span>
          </button>
        </div>

        {/* Post Button */}
        <button
          className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white px-5 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-rose-500/20 hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center gap-2 cursor-pointer active:scale-95"
          disabled={!post.trim() || loading || uploading}
          onClick={handlePost}
        >
          {uploading ? (
            <>
              <span>Uploading...</span>
              <Loader2 className="w-4 h-4 animate-spin" />
            </>
          ) : loading ? (
            <>
              <span>Posting...</span>
              <Loader2 className="w-4 h-4 animate-spin" />
            </>
          ) : (
            <>
              <span>Post</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}


