"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getBaseUrl } from "../../../lib/getBaseUrl";
import { Home, User, Info, LogOut, Sparkles, Sun, Moon } from "lucide-react";
import { useTheme } from "../Providers/ThemeProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { theme, toggleTheme } = useTheme();

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
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand */}
          <Link href="/public-feed" className="group flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.02]">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:rotate-6 transition-transform">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-rose-950 to-rose-700 dark:from-white dark:via-rose-200 dark:to-rose-400 bg-clip-text text-transparent">
                Takusa
              </span>
              <span className="hidden sm:block text-[10px] font-bold uppercase tracking-wider text-rose-500 -mt-1">
                Verse
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2 bg-slate-100/80 dark:bg-slate-800/80 p-1 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <button
                    className={`flex items-center gap-2 px-2 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-xs border border-slate-200/50 dark:border-slate-600 font-bold"
                        : "text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-white/50 dark:hover:bg-slate-700/50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-rose-600 dark:text-rose-400" : ""}`} />
                    <span className="hidden sm:inline">{link.label}</span>
                  </button>
                </Link>
              );
            })}
          </nav>

          {/* User Profile / Theme Toggle / Logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark/Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer active:scale-90"
              title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            <Link
              href="/profile"
              className="hidden md:flex items-center gap-2 pl-2 pr-3 py-1 bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/50 rounded-full hover:bg-rose-100/70 dark:hover:bg-rose-900/60 transition-colors"
              title="View Profile"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center text-white text-xs font-extrabold shadow-xs">
                {userInitials}
              </div>
              <span className="text-xs font-semibold text-rose-900 dark:text-rose-200 truncate max-w-[100px]">
                {userName}
              </span>
            </Link>

            <button
              className="flex items-center justify-center gap-2 px-2 sm:px-4 py-2 bg-slate-900 dark:bg-rose-600 hover:bg-rose-600 dark:hover:bg-rose-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-all duration-200 cursor-pointer active:scale-95"
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


