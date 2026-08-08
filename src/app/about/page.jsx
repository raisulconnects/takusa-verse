import Link from "next/link";
import { Sparkles, Github, Linkedin, BookOpen, Code2 } from "lucide-react";

export default function About() {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 py-12 overflow-hidden text-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-rose-300/30 via-pink-400/20 to-amber-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-rose-950/5 w-full max-w-2xl text-slate-800 dark:text-slate-100 space-y-6">
        <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/20">
          <Sparkles className="w-7 h-7 fill-current" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About{" "}
          <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">
            Takusa Verse
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          <strong className="text-rose-600 font-bold">Takusa Verse</strong> is a modern, minimalist blogging platform designed to bring together creative minds, developers, and storytellers. Whether you're sharing tech insights, creative stories, or personal reflections, Takusa Verse gives you the space to express yourself freely.
        </p>

        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
          It functions as a community-driven blogging hub and a high-performance web engineering portfolio built with Next.js 15, NextAuth, Tailwind CSS, and MongoDB.
        </p>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 gap-3 pt-2 text-left">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700 rounded-2xl flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">Rich Publishing</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Image &amp; Title stories</p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700 rounded-2xl flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">Modern Stack</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Next.js &amp; NextAuth</p>
            </div>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="flex justify-center gap-3 pt-4">
          <Link
            href="https://github.com/raisulconnects"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-slate-800 transition-all shadow-sm cursor-pointer"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Profile</span>
          </Link>
          <Link
            href="https://linkedin.com/in/raisul-tanna"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-sky-600 text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-sky-700 transition-all shadow-sm cursor-pointer"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

