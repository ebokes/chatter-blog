"use client";

import Rightbar from "@/app/components/nav/Rightbar";
import { usePosts } from "@/app/hooks/post";
import { Box } from "@chakra-ui/react";
import PostList from "@/app/components/posts/PostList";

export const metadata = {
  title: "Blog Feed",
  description: "Latest blog posts from our community",
};

const FeedComp = () => {
  const { posts } = usePosts();
  return (
    <>
      <Rightbar>
        <Box my={5}>
          <PostList posts={posts} link="feed" />
        </Box>
      </Rightbar>
    </>
  );
};

export default FeedComp;
