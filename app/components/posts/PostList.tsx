import { Box, Text } from "@chakra-ui/react";
import React from "react";
import PostCard from "./PostCard";
import { PostProps } from "@/app/hooks/post";
// import { PostProps } from "../hooks/post";

const PostList = ({ posts, link }: any) => {
  return (
    <Box borderRadius={"lg"} mt={"19px"}>
      {posts?.length === 0 ? (
        <Text>No posts yet</Text>
      ) : (
        posts?.map((post: PostProps) => (
          <PostCard key={post.id} post={post} link={link} />
        ))
      )}
    </Box>
  );
};

export default PostList;
