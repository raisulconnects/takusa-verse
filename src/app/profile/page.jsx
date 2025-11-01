"use client";

import { useSession } from "next-auth/react";
import useSWR from "swr";
import timeAgo from "../../../lib/timeAgo";

export default function Profile() {
  const { data: session } = useSession();

  const user = session?.user || {
    name: "John Doe",
    email: "john@example.com",
    role: "User",
  };

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
  console.log(posts);

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center px-4 py-10">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md text-gray-800 mb-10">
        <h1 className="text-3xl font-extrabold mb-6 text-pink-700 text-center">
          Your Profile
        </h1>
        <div className="flex flex-col gap-4 text-lg">
          <div>
            <span className="font-semibold text-gray-700">Name: </span>
            <span className="text-gray-800">{user.name}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Email: </span>
            <span className="text-gray-800">{user.email}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Role: </span>
            <span className="text-gray-800">{user.role}</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-pink-700 mb-6 text-center">
          Your Posts
        </h2>

        {isLoading ? (
          <p className="text-gray-500 text-center">Loading your posts...</p>
        ) : error ? (
          <p className="text-red-500 text-center">Error loading posts.</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500 text-center">
            You haven’t created any posts yet.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="p-5 bg-pink-50 border border-pink-100 rounded-xl hover:shadow-lg transition"
              >
                <p className="text-gray-800 mb-2">{post.post}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{timeAgo(post.createdAt)}</span>
                  <span className="flex-1 mx-5 text-pink-600">
                    {post.comments.length
                      ? `${post.comments.length} comment(s)`
                      : "No Comments Yet"}
                  </span>
                  <span
                    className={`${
                      post.status === "approved"
                        ? "text-green-600"
                        : post.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    } font-medium`}
                  >
                    {post.status}
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
