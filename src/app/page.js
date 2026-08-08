import Link from "next/link";
import { Sparkles, ArrowRight, BookOpen, Users, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden px-4 py-16">
      {/* Background Ambient Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-rose-300/30 via-pink-400/20 to-amber-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Hero Content Container */}
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/70 shadow-xs text-rose-700 text-xs sm:text-sm font-semibold animate-fade-in">
          <Sparkles className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span>The Next Generation Blogging Platform</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
          Share stories, inspire minds &{" "}
          <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">
            connect globally
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          Express your ideas effortlessly. Discover inspiring content, engage with readers through real-time discussions, and build your digital footprint.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full max-w-md mx-auto">
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold rounded-2xl shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/30 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-3.5 bg-white border border-slate-200/80 hover:border-rose-300 text-slate-700 hover:text-rose-600 font-bold rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Create Account</span>
          </Link>

          <Link
            href="/about"
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200/70 text-slate-600 font-semibold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Learn More</span>
          </Link>
        </div>

        {/* Feature Highlights Pill Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-12 text-left max-w-2xl mx-auto">
          <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/60 shadow-xs flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Rich Publishing</h3>
              <p className="text-xs text-slate-500 mt-0.5">Post stories with titles & images seamlessly.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/60 shadow-xs flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Active Feed</h3>
              <p className="text-xs text-slate-500 mt-0.5">Engage, like & comment on community posts.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/60 shadow-xs flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Safe & Fast</h3>
              <p className="text-xs text-slate-500 mt-0.5">Powered by Next-Auth & Cloudinary.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

