"use client";

export default function Post({ author, content, likes }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4 max-w-2/4 mx-auto mt-5">
      <div className="flex items-center justify-between">
        <span className="font-bold text-pink-700">{author}</span>
        <div className="flex items-center gap-2">
          <span className="text-gray-700">{likes}</span>
        </div>
      </div>

      <p className="text-gray-800">{content}</p>
      <button className="bg-pink-100 text-pink-700 px-3 py-1 w-1/5 rounded-2xl shadow-sm hover:bg-pink-200 transition-all">
        Like
      </button>
    </div>
  );
}
