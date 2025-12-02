"use client";

import { useEffect, useRef, useState } from "react";
import Post from "./Post";
import { useFeedProvider } from "../Providers/FeedProvider";

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

  // Load first batch
  useEffect(() => {
    fetchPosts();
  }, []);

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
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loaderRef.current, hasMore, loading, refresherCount]);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}

      {/* Loader sentinel */}
      <div ref={loaderRef} className="py-10 text-center">
        {loading && <span className="text-gray-500">Loading...</span>}

        {!hasMore && <span className="text-gray-400">No more posts</span>}
      </div>
    </div>
  );
}
