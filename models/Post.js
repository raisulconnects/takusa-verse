import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String },
    post: {
      type: String,
      validate: {
        validator: function (v) {
          return !!(v && v.trim()) || !!this.imageUrl || !!this.videoUrl;
        },
        message: "Post must contain text, an image, or a video.",
      },
    },
    likes: { type: [String], default: [] }, // ✅ prevent undefined
    imageUrl: { type: String, default: null },
    videoUrl: { type: String, default: null },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
      default: [],
    }, // ✅ prevent undefined
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
