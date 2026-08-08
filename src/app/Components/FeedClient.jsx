"use client";

import { useEffect, useRef, useState } from "react";
import Post from "./Post";
import { useFeedProvider } from "../Providers/FeedProvider";
import { CheckCircle2, Sparkles } from "lucide-react";

export default function FeedClient() {
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { refresherCount } = useFeedProvider();

  const limit = 5; // How many posts to load per request
  const loaderRef = useRef(null);

  const fetchPosts = async (forceSkip = null) => {
    if (loading) return;

    setLoading(true);

    const currentSkip = forceSkip !== null ? forceSkip : skip;

    try {
      const res = await fetch(
        `/api/posts/feed?skip=${currentSkip}&limit=${limit}`,
        {
          cache: "no-store",
        }
      );
      const data = await res.json();

      // If refresher triggered, start fresh
      if (forceSkip === 0) {
        setPosts(data.posts);
      } else {
        setPosts((prev) => [...prev, ...data.posts]);
      }

      setHasMore(data.hasMore);
      setSkip(currentSkip + limit);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPosts([]);
    setSkip(0);
    setHasMore(true);
    fetchPosts(0); // force skip = 0
  }, [refresherCount]);

  // Intersection Observer — load next batch
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchPosts();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loaderRef.current, hasMore, loading, refresherCount]);

  return (
    <div className="pb-12">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}

      {/* Loader sentinel & Skeleton */}
      <div ref={loaderRef} className="py-8 max-w-2xl mx-auto px-4">
        {loading && (
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-md border border-slate-200/60 p-6 rounded-3xl animate-pulse space-y-4 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-200" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 bg-slate-200 rounded-full w-1/3" />
                    <div className="h-3 bg-slate-200 rounded-full w-1/4" />
                  </div>
                </div>
                <div className="h-5 bg-slate-200 rounded-lg w-3/4" />
                <div className="h-40 bg-slate-200 rounded-2xl" />
                <div className="flex gap-3 pt-2">
                  <div className="h-9 bg-slate-200 rounded-xl flex-1" />
                  <div className="h-9 bg-slate-200 rounded-xl flex-1" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!hasMore && posts.length > 0 && (
          <div className="flex flex-col items-center justify-center gap-2 py-6 text-center text-slate-500">
            <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
              You're all caught up!
            </p>
            <p className="text-xs text-slate-500">No more posts to display right now.</p>
          </div>
        )}
      </div>
    </div>
  );
}

