"use client";

import PostCard from "@/app/components/posts/PostCard";
import Rightbar from "@/app/components/nav/Rightbar";
import { usePosts } from "@/app/hooks/post";
import { Box, useColorMode } from "@chakra-ui/react";

const Feed = () => {
  const { posts, isLoading: postLoading } = usePosts();
  const { colorMode } = useColorMode();
  return (
    <>
      <Rightbar>
        <Box my={10}>
          <Box>
            {posts?.map((post) => (
              <PostCard key={post.id} post={post} link={"feed"} />
            ))}
          </Box>
        </Box>
      </Rightbar>
    </>
  );
};

export default Feed;
