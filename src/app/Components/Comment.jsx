"use client";

export default function Comment({ comment }) {
  // comment is expected to have shape:
  // { _id, comment, createdAt, userId: { name } }
  return (
    <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* avatar placeholder */}
          <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 text-xs font-semibold">
            {comment?.userId?.name?.[0] ?? "U"}
          </div>

          <div>
            <div className="font-semibold text-pink-700 text-sm">
              {comment?.userId?.name ?? "Anonymous"}
            </div>
            <div className="text-xs text-gray-400">
              {new Date(comment?.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* optional actions (edit/delete) placeholder */}
        <div className="text-xs text-gray-300">•••</div>
      </div>

      <p className="text-sm text-gray-700 mt-2">{comment?.comment}</p>
    </div>
  );
}
