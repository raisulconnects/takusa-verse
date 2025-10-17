"use client";

import Post from "../Components/Post";
import PostBox from "../Components/PostBox";

export default async function PublicFeed() {
  // const res = await fetch("/api/posts");
  // const allPosts = await res.json();

  return (
    <div className="">
      <PostBox />
      {/* {allPosts.map((post) => (
        <Post post={post} />
      ))} */}
      <Post author={"Raisul"} content={"this is the post body"} likes={69} />
      <Post author={"Tanna"} content={"this is the second body"} likes={120} />
    </div>
  );
}
