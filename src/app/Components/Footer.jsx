"use client";

import Link from "next/link";
import { Github, Linkedin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 bg-white/70 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-slate-600 dark:text-slate-400 text-sm">
        {/* Left Side */}
        <div className="flex items-center gap-2 text-center md:text-left">
          <span>© {new Date().getFullYear()}</span>
          <span className="font-extrabold bg-gradient-to-r from-rose-600 to-amber-500 bg-clip-text text-transparent">
            Takusa Verse
          </span>
          <span className="text-slate-400 dark:text-slate-600">•</span>
          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            Crafted with <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" /> by Raisul Tanna
          </span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/raisulconnects"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-all shadow-xs"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </Link>

          <Link
            href="https://linkedin.com/in/raisul-tanna"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 bg-sky-600 text-white rounded-xl text-xs font-semibold hover:bg-sky-700 transition-all shadow-xs"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

