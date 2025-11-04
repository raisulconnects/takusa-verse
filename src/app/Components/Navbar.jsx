"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getBaseUrl } from "../../../lib/getBaseUrl";
import { Home, User, Info, LogOut } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "authenticated")
    return (
      <nav className="sticky top-0 z-50 bg-white shadow-md px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        {/* Left - Brand */}
        <Link href={"/public-feed"}>
          <div className="text-2xl font-extrabold text-pink-700 whitespace-nowrap flex items-center gap-2">
            Takusa Blog
          </div>
        </Link>

        {/* Center - Links */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <Link href={"/public-feed"}>
            <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-pink-100 text-pink-700 rounded-2xl shadow-sm hover:bg-pink-200 transition-all w-full sm:w-auto">
              <Home size={18} />
              <span className="hidden sm:inline">Post Feed</span>
            </button>
          </Link>

          <Link href={"/profile"}>
            <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-pink-100 text-pink-700 rounded-2xl shadow-sm hover:bg-pink-200 transition-all w-full sm:w-auto">
              <User size={18} />
              <span className="hidden sm:inline">Profile</span>
            </button>
          </Link>

          <Link href={"/about"}>
            <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-pink-100 text-pink-700 rounded-2xl shadow-sm hover:bg-pink-200 transition-all w-full sm:w-auto">
              <Info size={18} />
              <span className="hidden sm:inline">About</span>
            </button>
          </Link>
        </div>

        {/* Right - Logout */}
        <div>
          <button
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-pink-600 text-white rounded-2xl font-semibold shadow-md hover:bg-pink-700 transition-all w-full sm:w-auto"
            onClick={() => {
              signOut({ callbackUrl: `${getBaseUrl()}/` });
            }}
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>
    );

  if (status === "unauthenticated") return <></>;
}
