"use client";

import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();

  const user = session?.user || {
    name: "John Doe",
    email: "john@example.com",
    role: "User",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md text-gray-800">
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
    </div>
  );
}
