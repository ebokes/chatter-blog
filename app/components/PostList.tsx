import { Box, Text } from "@chakra-ui/react";
import React from "react";
import PostCard from "./PostCard";
import { PostProps } from "../hooks/post";

const PostList = ({ posts }: any) => {
  return (
    <Box
      // border={"1px solid"}
      // borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
      borderRadius={"lg"}
      // justify={"space-between"}
      mt={"19px"}
      // px={{ base: "24px", lg: "44px" }}
      //  px={"51px"}
    >
      {posts?.length === 0 ? (
        <Text>No posts yet</Text>
      ) : (
        posts?.map((post: PostProps) => <PostCard key={post.id} post={post} />)
      )}
    </Box>
  );
};

export default PostList;
