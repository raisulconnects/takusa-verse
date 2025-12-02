"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFeedProvider } from "../Providers/FeedProvider";

export default function PostBox() {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState(""); // ✅ existing: title state
  const [showTitle, setShowTitle] = useState(false); // ✅ existing: toggle title
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const { triggerRefreseh } = useFeedProvider();

  // ✅ New states for image upload
  const [imageFile, setImageFile] = useState(null); // stores selected file
  const [imagePreview, setImagePreview] = useState(null); // stores local preview URL
  const [uploading, setUploading] = useState(false); // upload in progress state

  const nextRouter = useRouter();

  // ✅ Handle file selection and show preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // show preview immediately
    }
  };

  // ✅ Upload image to Cloudinary using unsigned preset
  const uploadToCloudinary = async () => {
    if (!imageFile) return null;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "takusa_blog"); // your unsigned preset
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dh5r86rqw/image/upload", // your cloud name
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setUploading(false);
      return data.secure_url; // ✅ URL to save in DB
    } catch (err) {
      console.error("Image upload failed:", err);
      setUploading(false);
      return null;
    }
  };

  // ✅ Main post handler updated to handle image
  const handlePost = async () => {
    if (!post.trim()) return;

    try {
      setLoading(true);

      // ✅ Upload image first if one was selected
      let uploadedUrl = null;
      if (imageFile) {
        uploadedUrl = await uploadToCloudinary();
      }

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post,
          title: showTitle ? title : "",
          user: session.user.id,
          comments: [],
          imageUrl: uploadedUrl, // ✅ send image URL to backend
        }),
      });

      if (!res.ok) throw new Error("Failed to post");

      // ✅ Reset states after successful post
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
      {/* Conditional title textarea */}
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

      <textarea
        value={post}
        onChange={(e) => setPost(e.target.value)}
        placeholder="What's on your mind today..."
        className="w-full p-3 border-2 border-pink-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 resize-none transition-all text-base sm:text-lg"
        rows={3}
        maxLength={600}
      />

      {/* ✅ File input for image */}

      {/* ✅ Image preview */}
      {/* ✅ Styled file input as a button */}
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
          className="hidden" // hide default input
        />
      </div>

      {/* Button container */}
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
          className="bg-pink-600 text-white px-6 py-2 rounded-2xl font-bold shadow-md hover:bg-pink-700 transition-all disabled:opacity-50 text-sm sm:text-base"
          disabled={!post.trim() || loading || uploading} // ✅ disabled while uploading image
          onClick={handlePost}
        >
          {uploading ? "Uploading..." : loading ? "Posting..." : "Post"}{" "}
          {/* ✅ dynamic button text */}
        </button>
      </div>
    </div>
  );
}
