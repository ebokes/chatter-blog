"use client";

import PostCard from "@/app/components/PostCard";
import Recommendation from "@/app/components/Rightbar";
import { usePosts } from "@/app/hooks/post";
import { Box, useColorMode } from "@chakra-ui/react";

const Feed = () => {
  const { posts, isLoading: postLoading } = usePosts();
  const { colorMode } = useColorMode();
  return (
    <>
      <Recommendation>
        <Box my={10}>
          <Box>
            {posts?.map((post) => (
              <PostCard key={post.id} post={post} link={"feed"} />
            ))}
          </Box>
        </Box>
      </Recommendation>
    </>
  );
};

export default Feed;
