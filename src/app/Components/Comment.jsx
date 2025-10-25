"use client";

export default function Comment({ comment }) {
  return (
    <div className="flex flex-col gap-2 my-3">
      <div className="bg-white border border-gray-100 rounded-2xl px-4 py-2 shadow-sm hover:shadow-md transition">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-pink-700 text-sm">
            {comment.userId.name}
          </span>
          <span className="text-xs text-gray-400">Oct 23</span>
        </div>
        <p className="text-sm text-gray-700 mt-1">{comment.comment}</p>
      </div>
    </div>
  );
}
