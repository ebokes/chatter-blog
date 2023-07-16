"use client";

import PostList from "@/app/components/posts/PostList";
import { useAuth } from "@/app/hooks/auth";
import { useBookmarkedPosts } from "@/app/hooks/bookmarks";
import { usePosts } from "@/app/hooks/post";
import Loading from "@/app/loader/Loading";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";

const Bookmarks = () => {
  const { colorMode } = useColorMode();
  const { user, isLoading: userLoading } = useAuth();
  const { posts } = usePosts();
  const { userBookmarks, isLoading: userBookmarksLoading } = useBookmarkedPosts(
    user?.id
  );

  const bookmarkedPostIds = userBookmarks?.map((post) => post?.postId);
  const bookmarkedPostsData = posts?.filter((post) =>
    bookmarkedPostIds?.includes(post?.id)
  );

  if (userBookmarksLoading || userLoading) {
    return <Loading />;
  }

  return (
    <Box
      p={8}
      // bg={colorMode === "light" ? "gray.100" : "gray.800"}
    >
      <Flex align="center" justify="space-between" mb={8}>
        <Stack>
          <Heading fontWeight={500} fontSize={{ base: "xl", md: "2xl" }}>
            Bookmarks
          </Heading>
          <Text fontSize={{ base: "sm", md: "md" }}>
            Saved articles for later reading
          </Text>
        </Stack>
      </Flex>
      <Box bg={colorMode === "light" ? "white" : "gray.700"} rounded="lg" p={4}>
        <PostList posts={bookmarkedPostsData} link="dashboard" />
      </Box>
    </Box>
  );
};

export default Bookmarks;
