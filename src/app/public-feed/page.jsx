import { getAllPosts } from "../../../lib/getAllPosts";
import Post from "../Components/Post";
import PostBox from "../Components/PostBox";

export const revalidate = 60;

export default async function PublicFeed() {
  const allPosts = await getAllPosts();
  // console.log(allPosts);

  return (
    <div className="">
      <PostBox />
      {allPosts?.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}
