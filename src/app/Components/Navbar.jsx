"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log("From public Feed Nav -> ", status);

  if (status === "authenticated")
    return (
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        {/* Left */}
        <Link href={"/public-feed"}>
          {" "}
          <div className="text-2xl font-extrabold text-pink-700">
            Takusa Blog
          </div>
        </Link>

        {/* Center */}
        <div className="flex space-x-4">
          <Link href={"/public-feed"}>
            <button className="px-4 py-2 bg-pink-100 text-pink-700 rounded-2xl shadow-sm hover:bg-pink-200 transition-all">
              Post Feed
            </button>
          </Link>

          <Link href={"/profile"}>
            <button className="px-4 py-2 bg-pink-100 text-pink-700 rounded-2xl shadow-sm hover:bg-pink-200 transition-all">
              Profile
            </button>
          </Link>
        </div>

        {/* Right */}
        <div>
          <button
            className="px-4 py-2 bg-pink-600 text-white rounded-2xl shadow-md hover:bg-pink-700 transition-all"
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
          >
            Logout
          </button>
        </div>
      </nav>
    );

  if (status === "unauthenticated") return <></>;
}
