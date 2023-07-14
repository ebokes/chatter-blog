import { Box, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import PostCard from "./PostCard";
import { PostProps } from "@/app/hooks/post";
import { ChatterContext } from "@/app/context/ChatterContext";

const PostList = ({ posts, link }: any) => {
  const { searchResults } = useContext(ChatterContext);
  return (
    <Box borderRadius={"lg"} mt={"19px"}>
      {searchResults?.length ? (
        searchResults?.map((post: PostProps) => (
          <PostCard key={post.id} post={post} link={link} />
        ))
      ) : (
        <Box>
          {posts?.length === 0 ? (
            <Text>No posts yet</Text>
          ) : (
            posts?.map((post: PostProps) => (
              <PostCard key={post.id} post={post} link={link} />
            ))
          )}
        </Box>
      )}
    </Box>
  );
};

export default PostList;
