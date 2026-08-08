import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Users,
  ShieldCheck,
  Pen,
  MessageCircle,
  Heart,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* ── Animated Background Blobs ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Primary blob */}
        <div className="animate-blob absolute top-[15%] left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-rose-300/25 via-pink-400/15 to-amber-200/25 blur-3xl" />
        {/* Secondary blob */}
        <div className="animate-blob-2 absolute bottom-[10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-gradient-to-tl from-violet-300/20 via-rose-300/15 to-pink-400/20 blur-3xl" />
        {/* Tertiary blob */}
        <div
          className="animate-blob absolute top-[60%] left-[-8%] w-[350px] h-[350px] rounded-full bg-gradient-to-br from-amber-300/20 to-rose-300/20 blur-3xl"
          style={{ animationDelay: "4s" }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f920_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f920_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e29360d_1px,transparent_1px),linear-gradient(to_bottom,#1e29360d_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      {/* ── HERO SECTION ── */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-7">

          {/* Brand Logo Badge */}
          <div className="animate-fade-in-up delay-100 inline-flex items-center gap-2.5 px-5 py-2 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/70 dark:border-slate-800 shadow-sm">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-sm font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
              Takusa Verse
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 pl-2 border-l border-slate-200 dark:border-slate-700 text-xs font-semibold text-rose-600 dark:text-rose-400">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              Live Platform
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="animate-fade-in-up delay-200 text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.07] text-slate-900 dark:text-white">
            Your stories,{" "}
            <br className="hidden sm:block" />
            your{" "}
            <span className="animate-shimmer-text">
              universe
            </span>
          </h1>

          {/* Brand tagline */}
          <p className="animate-fade-in-up delay-300 text-lg sm:text-xl text-slate-500 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            <strong className="text-slate-800 dark:text-white font-extrabold">Takusa Verse</strong> is where creative minds publish freely, readers engage deeply, and ideas travel far. Write your next chapter today.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/register"
              className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold rounded-2xl shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.97]"
            >
              <Pen className="w-4 h-4" />
              <span>Start Writing Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-800 text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 font-bold rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.97]"
            >
              <span>Sign In</span>
            </Link>
          </div>

          {/* Social proof micro-stats */}
          <div className="animate-fade-in-up delay-500 flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["from-rose-400 to-pink-500", "from-amber-400 to-orange-500", "from-violet-400 to-purple-500"].map((g, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full bg-gradient-to-tr ${g} border-2 border-white dark:border-slate-900 flex items-center justify-center text-white text-[10px] font-bold`}
                  >
                    {["R", "T", "A"][i]}
                  </div>
                ))}
              </div>
              <span>Writers already here</span>
            </div>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>Real stories, real impact</span>
            </div>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Instant publishing</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE CARDS SECTION ── */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        {/* Section heading */}
        <div className="animate-fade-in-up delay-600 text-center mb-12 space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-600 dark:text-rose-400">
            Everything you need
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built for{" "}
            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">
              storytellers
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto text-sm sm:text-base font-medium">
            Takusa Verse combines the simplicity of social media with the depth of long-form publishing.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="animate-fade-in-up delay-600 group p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/70 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-rose-500/10 hover:-translate-y-1 transition-all duration-300 cursor-default">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center mb-4 shadow-md shadow-rose-500/25 group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base mb-2">Rich Publishing</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Write with titles, upload stunning images, and tell your story exactly the way you envision it.
            </p>
          </div>

          {/* Card 2 */}
          <div className="animate-fade-in-up delay-700 group p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/70 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1 transition-all duration-300 cursor-default">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center mb-4 shadow-md shadow-amber-500/25 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base mb-2">Live Community Feed</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Discover posts from the community in real time, like stories that resonate, and join every conversation.
            </p>
          </div>

          {/* Card 3 */}
          <div className="animate-fade-in-up delay-800 group p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/70 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 cursor-default">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center mb-4 shadow-md shadow-emerald-500/25 group-hover:scale-110 transition-transform duration-300">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base mb-2">Secure & Fast</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Built on Next.js 15, NextAuth, and Cloudinary — enterprise-grade security with lightning performance.
            </p>
          </div>

          {/* Card 4 */}
          <div className="animate-fade-in-up delay-700 group p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/70 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-pink-500/10 hover:-translate-y-1 transition-all duration-300 cursor-default">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center mb-4 shadow-md shadow-pink-500/25 group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base mb-2">Optimistic Likes</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Show appreciation instantly. Our optimistic UI updates react in real time — no waiting, no delays.
            </p>
          </div>

          {/* Card 5 */}
          <div className="animate-fade-in-up delay-800 group p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/70 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1 transition-all duration-300 cursor-default">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-500 to-purple-600 flex items-center justify-center mb-4 shadow-md shadow-violet-500/25 group-hover:scale-110 transition-transform duration-300">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base mb-2">Threaded Comments</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Engage in rich discussions on every post. Start a conversation or join one — your voice matters.
            </p>
          </div>

          {/* Card 6 — CTA card */}
          <div className="animate-fade-in-up delay-900 group relative p-6 rounded-3xl bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-500 shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-default">
            {/* Spinning decoration */}
            <div className="animate-spin-slow absolute -top-6 -right-6 w-24 h-24 rounded-full border-2 border-white/20" />
            <div className="animate-spin-slow absolute -bottom-4 -left-4 w-16 h-16 rounded-full border border-white/10" style={{ animationDirection: "reverse" }} />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <h3 className="font-extrabold text-white text-base mb-2">Ready to start?</h3>
              <p className="text-sm text-white/80 leading-relaxed mb-4">
                Join Takusa Verse and share your first story with the world today.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-rose-600 font-bold rounded-xl text-sm hover:bg-rose-50 transition-colors duration-200 cursor-pointer"
              >
                <span>Join now</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM BRAND STRIP ── */}
      <section className="border-t border-slate-200/60 dark:border-slate-800/60 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4 animate-fade-in-up delay-1000">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center shadow-sm animate-bounce-subtle">
              <Sparkles className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              Takusa Verse
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-medium max-w-lg mx-auto">
            A blogging platform crafted with passion — where every story finds its audience and every voice finds its home.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link
              href="/about"
              className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors underline-offset-4 hover:underline"
            >
              About the project
            </Link>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Link
              href="/register"
              className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors underline-offset-4 hover:underline"
            >
              Get started free →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
