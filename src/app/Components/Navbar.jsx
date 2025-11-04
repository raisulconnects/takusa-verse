"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getBaseUrl } from "../../../lib/getBaseUrl";

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "authenticated")
    return (
      // ✅ Made sticky and responsive container
      <nav className="sticky top-0 z-50 bg-white shadow-md px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        {/* Left */}
        <Link href={"/public-feed"}>
          <div className="text-2xl font-extrabold text-pink-700 whitespace-nowrap">
            Takusa Blog
          </div>
        </Link>

        {/* Center */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          <Link href={"/public-feed"}>
            <button className="px-4 py-2 bg-pink-100 text-pink-700 rounded-2xl shadow-sm hover:bg-pink-200 transition-all w-full sm:w-auto">
              Post Feed
            </button>
          </Link>

          <Link href={"/profile"}>
            <button className="px-4 py-2 bg-pink-100 text-pink-700 rounded-2xl shadow-sm hover:bg-pink-200 transition-all w-full sm:w-auto">
              Profile
            </button>
          </Link>

          <Link href={"/about"}>
            <button className="px-4 py-2 bg-pink-100 text-pink-700 rounded-2xl shadow-sm hover:bg-pink-200 transition-all w-full sm:w-auto">
              About Us
            </button>
          </Link>
        </div>

        {/* Right */}
        <div>
          <button
            className="px-4 py-2 bg-pink-600 text-white rounded-2xl shadow-md hover:bg-pink-700 transition-all w-full sm:w-auto"
            onClick={() => {
              signOut({ callbackUrl: `${getBaseUrl()}/` });
            }}
          >
            Logout
          </button>
        </div>
      </nav>
    );

  if (status === "unauthenticated") return <></>;
}
