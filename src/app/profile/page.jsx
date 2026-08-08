"use client";

import { useSession } from "next-auth/react";
import useSWR from "swr";
import timeAgo from "../../../lib/timeAgo";
import { User, Mail, Shield, FileText, MessageSquare, Clock, AlertCircle } from "lucide-react";

export default function Profile() {
  const { data: session } = useSession();

  const user = session?.user || {
    name: "John Doe",
    email: "john@example.com",
    role: "User",
  };

  const userInitials = (user?.name || "User")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const shouldFetch = !!session?.user?.id;

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, isLoading, error } = useSWR(
    shouldFetch ? `/api/profilepost/${session.user.id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      keepPreviousData: true,
    }
  );

  const posts = data?.userPosts || [];

  return (
    <div className="min-h-[85vh] flex flex-col items-center px-4 py-10 max-w-3xl mx-auto space-y-8">
      {/* Profile Card Header */}
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl border border-slate-200/80 shadow-sm w-full text-slate-800">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center text-white text-2xl font-extrabold shadow-lg shadow-rose-500/25 shrink-0">
            {userInitials}
          </div>

          {/* User Info */}
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {user?.name}
              </h1>
              <span className="px-3 py-1 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-full uppercase tracking-wider">
                {user?.role || "Member"}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-rose-500" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-rose-500" />
                <span>{posts.length} {posts.length === 1 ? "Post" : "Posts"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User's Created Posts Section */}
      <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm w-full">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="w-5 h-5 text-rose-500" />
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Your Stories
          </h2>
        </div>

        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-20 bg-slate-100 rounded-2xl" />
            <div className="h-20 bg-slate-100 rounded-2xl" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-rose-50 text-rose-700 text-sm font-semibold">
            <AlertCircle className="w-4 h-4" />
            <span>Error loading posts. Please try again.</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-10 text-slate-400 space-y-2">
            <FileText className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-sm font-semibold text-slate-600">No posts published yet</p>
            <p className="text-xs">Your created stories will appear here.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="p-5 bg-slate-50/70 border border-slate-200/60 rounded-2xl hover:bg-white hover:border-slate-300 transition-all duration-200 space-y-3"
              >
                {post.title && (
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {post.title}
                  </h3>
                )}
                <p className="text-slate-700 text-sm font-medium leading-relaxed line-clamp-3">
                  {post.post}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs font-semibold text-slate-500 border-t border-slate-200/40">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{timeAgo(post.createdAt)}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-rose-600">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>
                      {post.comments.length
                        ? `${post.comments.length} comment(s)`
                        : "No Comments"}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                      post.status === "approved"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : post.status === "pending"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-rose-50 text-rose-700 border border-rose-200"
                    }`}
                  >
                    {post.status || "published"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

