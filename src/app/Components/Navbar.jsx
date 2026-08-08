"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getBaseUrl } from "../../../lib/getBaseUrl";
import { Home, User, Info, LogOut, Sparkles } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    const userName = session?.user?.name || "User";
    const userInitials = userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

    const navLinks = [
      { href: "/public-feed", label: "Post Feed", icon: Home },
      { href: "/profile", label: "Profile", icon: User },
      { href: "/about", label: "About", icon: Info },
    ];

    return (
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link href="/public-feed" className="group flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.02]">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:rotate-6 transition-transform">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-rose-950 to-rose-700 bg-clip-text text-transparent">
                Takusa
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 -mt-1">
                Verse
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <button
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-white text-rose-600 shadow-xs border border-slate-200/50 font-bold"
                        : "text-slate-600 hover:text-rose-600 hover:bg-white/50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-rose-600" : ""}`} />
                    <span className="hidden sm:inline">{link.label}</span>
                  </button>
                </Link>
              );
            })}
          </nav>

          {/* User Profile / Logout */}
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="hidden md:flex items-center gap-2 pl-2 pr-3 py-1 bg-rose-50 border border-rose-100 rounded-full hover:bg-rose-100/70 transition-colors"
              title="View Profile"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center text-white text-xs font-extrabold shadow-xs">
                {userInitials}
              </div>
              <span className="text-xs font-semibold text-rose-900 truncate max-w-[100px]">
                {userName}
              </span>
            </Link>

            <button
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-slate-900 hover:bg-rose-600 text-white rounded-xl text-sm font-semibold shadow-sm transition-all duration-200 cursor-pointer active:scale-95"
              onClick={() => {
                signOut({ callbackUrl: `${getBaseUrl()}/` });
              }}
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  return null;
}

