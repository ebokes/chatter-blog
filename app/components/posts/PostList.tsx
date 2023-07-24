"use client";

import { Box, Flex, Heading, Text, useColorMode } from "@chakra-ui/react";
import React, { useContext } from "react";
import PostCard from "./PostCard";
import { PostProps } from "@/app/hooks/post";
import { ChatterContext } from "@/app/context/ChatterContext";
import Loading from "@/app/loader/Loading";

const PostList = ({ posts, link, title, isLoading }: any) => {
  const { colorMode } = useColorMode();
  const { searchResults } = useContext(ChatterContext);

  // if (isLoading) return <Loading />;

  return (
    <Box borderRadius={"lg"} mt={"41px"} w={"full"}>
      {searchResults?.length ? (
        searchResults?.map((post: PostProps) => (
          <PostCard key={post.id} post={post} link={link} />
        ))
      ) : (
        <Box>
          {title && (
            <Flex
              bg={colorMode === "light" ? "brand.200" : "brand.800"}
              color={colorMode === "light" ? "brand.800" : "brand.400"}
              border={"1px solid"}
              borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
              borderRadius={"5px"}
              mb={4}
              p={4}
            >
              <Heading fontSize={"28px"}>{title}</Heading>
            </Flex>
          )}
          {posts?.length === 0 ? (
            <Text>No posts yet</Text>
          ) : (
            posts?.map((post: PostProps) => (
              <PostCard
                key={post.id}
                post={post}
                link={link}
                isLoading={isLoading}
              />
            ))
          )}
        </Box>
      )}
    </Box>
  );
};

export default PostList;
