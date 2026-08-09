"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Sparkles,
  PenLine,
  BookOpen,
  Image as ImageIcon,
  Video,
  Type,
  Heart,
  User,
  Info,
  ArrowRight,
  Check,
  X,
} from "lucide-react";

const slides = [
  {
    icon: Sparkles,
    title: "Welcome to Takusa Verse!",
    description:
      "A modern blogging platform where your stories find their audience. Here's a quick tour of the essentials — it only takes a minute.",
    accent: "from-rose-500 via-pink-500 to-amber-400",
    visual: (
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center shadow-xl shadow-rose-500/30">
        <Sparkles className="w-9 h-9 text-white fill-white" />
      </div>
    ),
  },
  {
    icon: PenLine,
    title: "Create a post",
    description:
      "The composer sits at the top of the feed. Write your thoughts, add a catchy title, or upload an image and a video — you can post with any of them.",
    accent: "from-rose-500 to-pink-600",
    visual: (
      <div className="flex flex-col items-center gap-2">
        <div className="w-56 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-left">
          <div className="h-2.5 w-32 bg-slate-300 dark:bg-slate-600 rounded-full mb-1.5" />
          <div className="h-2 w-44 bg-slate-200 dark:bg-slate-700 rounded-full" />
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-rose-500 border border-slate-200 dark:border-slate-700">
            <ImageIcon className="w-3 h-3" /> Photo
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-rose-500 border border-slate-200 dark:border-slate-700">
            <Video className="w-3 h-3" /> Video
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-rose-500 border border-slate-200 dark:border-slate-700">
            <Type className="w-3 h-3" /> Title
          </span>
        </div>
      </div>
    ),
  },
  {
    icon: BookOpen,
    title: "Find posts",
    description:
      "Browse the Post Feed to read stories from the community. Scroll down and more posts load automatically — you're never far from something new.",
    accent: "from-violet-500 to-purple-600",
    visual: (
      <div className="flex flex-col gap-2 w-56">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-3"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-rose-400 to-pink-500" />
              <div className="h-2 w-20 bg-slate-300 dark:bg-slate-600 rounded-full" />
            </div>
            <div className="h-2 w-40 bg-slate-200 dark:bg-slate-700 rounded-full mb-1" />
            <div className="h-2 w-32 bg-slate-200 dark:bg-slate-700 rounded-full" />
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Heart,
    title: "Like posts",
    description:
      "Show some love! Tap the heart on any post to like it. The count updates instantly, and tapping again removes your like.",
    accent: "from-rose-500 to-rose-600",
    visual: (
      <div className="flex items-center gap-3 px-5 py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
        <span className="flex items-center gap-1.5 text-sm font-bold text-rose-500">
          <Heart className="w-5 h-5 fill-rose-500 text-rose-500" /> Like
        </span>
        <span className="text-xs font-semibold text-slate-400">
          <span className="font-extrabold text-slate-600 dark:text-slate-200">128</span> Likes
        </span>
      </div>
    ),
  },
  {
    icon: User,
    title: "Profile & About",
    description:
      "Use the navigation bar to jump around — your Profile shows your posts and account details, and About tells the story behind Takusa Verse.",
    accent: "from-amber-400 to-orange-500",
    visual: (
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] font-bold text-slate-600 dark:text-slate-300">
          <User className="w-3.5 h-3.5 text-rose-500" /> Profile
        </span>
        <span className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] font-bold text-slate-600 dark:text-slate-300">
          <Info className="w-3.5 h-3.5 text-rose-500" /> About
        </span>
      </div>
    ),
  },
  {
    icon: Check,
    title: "You're all set!",
    description:
      "Now go share your first story with the world. Tap the composer and start typing — happy writing!",
    accent: "from-emerald-500 to-teal-500",
    visual: (
      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center shadow-xl shadow-emerald-500/30">
        <Check className="w-9 h-9 text-white" strokeWidth={3} />
      </div>
    ),
  },
];

const storageKey = (userId) => `takusa_onboarded_${userId}`;

export default function OnboardingTour() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (status !== "authenticated") return;
    const userId = session?.user?.id;
    if (!userId) return;

    try {
      const done = localStorage.getItem(storageKey(userId)) === "true";
      if (!done) setOpen(true);
    } catch (e) {
      setOpen(true);
    }
  }, [status, session]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const dismiss = () => {
    const userId = session?.user?.id;
    try {
      if (userId) localStorage.setItem(storageKey(userId), "true");
    } catch (e) {}
    setOpen(false);
  };

  if (!open || status !== "authenticated") return null;

  const slide = slides[index];
  const Icon = slide.icon;
  const isLast = index === slides.length - 1;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl shadow-slate-950/40 overflow-hidden animate-fade-in-up">
        {/* Top accent bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${slide.accent}`} />

        {/* Close */}
        <button
          type="button"
          onClick={dismiss}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title="Skip tour"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-7 sm:p-8 text-center">
          {/* Visual */}
          <div className="flex justify-center mb-6">{slide.visual}</div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3 flex items-center justify-center gap-2">
            <Icon className={`w-5 h-5 bg-gradient-to-r ${slide.accent} text-transparent bg-clip-text`} />
            {slide.title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium mb-6">
            {slide.description}
          </p>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-1.5 mb-6">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-6 bg-gradient-to-r from-rose-500 to-pink-500"
                    : "w-1.5 bg-slate-200 dark:bg-slate-700"
                }`}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={dismiss}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              Skip
            </button>

            <button
              type="button"
              onClick={() => {
                if (isLast) dismiss();
                else setIndex((i) => i + 1);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md bg-gradient-to-r ${slide.accent} hover:opacity-90 transition-all active:scale-95 cursor-pointer`}
            >
              <span>{isLast ? "Start Exploring" : "Next"}</span>
              {isLast ? (
                <Check className="w-3.5 h-3.5" strokeWidth={3} />
              ) : (
                <ArrowRight className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
