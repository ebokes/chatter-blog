import { Box, Text } from "@chakra-ui/react";
import React from "react";
import PostCard from "./PostCard";
import { PostProps } from "@/app/hooks/post";
// import { PostProps } from "../hooks/post";

const PostList = ({ posts, link }: any) => {
  return (
    <Box
      borderRadius={"lg"}
      mt={"19px"}
      // border={"1px solid"}
      // borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
      // justify={"space-between"}
      // px={{ base: "24px", lg: "44px" }}
      //  px={"51px"}
    >
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
