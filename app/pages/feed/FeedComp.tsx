"use client";

import Rightbar from "@/app/components/nav/Rightbar";
import { usePosts } from "@/app/hooks/post";
import PostList from "@/app/components/posts/PostList";

export const metadata = {
  title: "Blog Feed",
  description: "Latest blog posts from our community",
};

const FeedComp = () => {
  const { posts } = usePosts();
  return (
    <Rightbar>
      <PostList posts={posts} link="feed" title={"Feed"} />
    </Rightbar>
  );
};

export default FeedComp;
