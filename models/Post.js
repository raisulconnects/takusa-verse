import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    // this userID links comments to the USER
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    post: { type: String, required: true },
    status: { type: String, required: true, default: "approved" },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: Number, required: true, default: 0 }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
