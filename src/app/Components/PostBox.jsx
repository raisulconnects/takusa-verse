"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, X } from "lucide-react";
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

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md w-full max-w-2xl sm:max-w-3xl lg:max-w-2/4 m-3 mx-auto">
      {/* TITLE */}
      {showTitle && (
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a catchy title..."
          className="w-full p-3 mb-3 border-2 border-pink-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 resize-none transition-all text-base sm:text-lg"
          rows={2}
          maxLength={150}
        />
      )}

      {/* MAIN POST TEXT */}
      <textarea
        value={post}
        onChange={(e) => setPost(e.target.value)}
        placeholder="What's on your mind today..."
        className="w-full p-3 border-2 border-pink-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 resize-none transition-all text-base sm:text-lg"
        rows={3}
        maxLength={600}
      />

      {/* IMAGE UPLOAD */}
      <div className="mt-3">
        <label
          htmlFor="imageUpload"
          className="cursor-pointer px-5 py-2 rounded-2xl font-semibold border-2 transition-all text-sm sm:text-base bg-pink-600 text-white hover:bg-pink-700"
        >
          {imageFile ? "Change Image" : "Upload Image"}
        </label>

        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {/* FILENAME + REMOVE BUTTON */}
        {imageFile && (
          <div className="mt-3 flex items-center gap-3 p-2 border rounded-xl bg-gray-50">
            <p className="text-sm text-gray-700 font-medium">
              {imageFile.name}
            </p>

            <button
              type="button"
              onClick={removeImage}
              className="p-1 text-gray-600 hover:text-red-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* OPTIONAL: SMALL PREVIEW */}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-3 w-32 h-32 object-cover rounded-xl border"
          />
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row justify-end mt-4 gap-3 sm:gap-2">
        <button
          type="button"
          onClick={() => setShowTitle((prev) => !prev)}
          className={`px-5 py-2 rounded-2xl font-semibold border-2 transition-all text-sm sm:text-base ${
            showTitle
              ? "bg-pink-200 border-pink-400 text-pink-700"
              : "bg-white border-pink-300 text-pink-600 hover:bg-pink-100"
          }`}
        >
          {showTitle ? "Remove Title" : "Add Title"}
        </button>

        <button
          className="bg-pink-600 text-white px-6 py-2 rounded-2xl font-bold shadow-md hover:bg-pink-700 transition-all disabled:opacity-50 text-sm sm:text-base flex items-center justify-center gap-2"
          disabled={!post.trim() || loading || uploading}
          onClick={handlePost}
        >
          {uploading ? "Uploading..." : loading ? "Posting..." : "Post"}

          {(uploading || loading) && (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
        </button>
      </div>
    </div>
  );
}
