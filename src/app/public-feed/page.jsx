import Post from "../Components/Post";
import PostBox from "../Components/PostBox";

export default async function PublicFeed() {
  const res = await fetch("http://localhost:3000/api/posts", {
    next: { tags: ["allPosts"] },
  });
  const allPosts = await res.json();
  // console.log(allPosts);

  return (
    <div className="">
      <PostBox />
      {allPosts?.map((post) => (
        <Post key={post._id} post={post} />
      ))}
      {/* <Post author={"Raisul"} content={"this is the post body"} likes={69} /> */}
      {/* <Post author={"Tanna"} content={"this is the second body"} likes={120} /> */}
    </div>
  );
}
