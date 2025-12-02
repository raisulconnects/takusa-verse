import connectDB from "../../../lib/connectDB";
import { getAllPosts } from "../../../lib/getAllPosts";
import Post from "../Components/Post";
import PostBox from "../Components/PostBox";
import User from "../../../models/User";
import FeedClient from "../Components/FeedClient";
import { FeedContextProvider } from "../Providers/FeedProvider";

export const dynamic = "force-dynamic";
// export const revalidate = 10;

export default function PublicFeed() {
  return (
    <div>
      <FeedContextProvider>
        <PostBox />
        <FeedClient />
      </FeedContextProvider>
    </div>
  );
}
