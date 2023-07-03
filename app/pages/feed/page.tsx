"use client";

import Post from "@/app/components/PostCard";
import Recommendation from "@/app/components/Rightbar";
import { usePosts } from "@/app/hooks/post";
import { Box, Flex, useColorMode } from "@chakra-ui/react";
import { useState } from "react";

const Feed = () => {
  // const { posts } = useContext(ChatterContext);
  const { posts, isLoading: postLoading } = usePosts();
  const { colorMode } = useColorMode();
  // const { user, isLoading } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };
  return (
    <>
      <Recommendation>
        <Box>
          <Flex align={"flex-end"} justify={"space-between"} my={5}></Flex>

          <Box>
            {posts?.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </Box>
          {/* </Box> */}
        </Box>
      </Recommendation>
    </>
  );
};

export default Feed;
