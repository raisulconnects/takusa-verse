import connectDB from "../../../lib/connectDB";
import { getAllPosts } from "../../../lib/getAllPosts";
import Post from "../Components/Post";
import PostBox from "../Components/PostBox";

export const dynamic = "force-dynamic";
// export const revalidate = 10;

export default async function PublicFeed() {
  await connectDB();
  const allPosts = await getAllPosts();
  // console.log(allPosts);
  console.log(" ---------------> PublicFeed Being Rebuild");

  return (
    <div className="">
      <PostBox />
      {allPosts?.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}
