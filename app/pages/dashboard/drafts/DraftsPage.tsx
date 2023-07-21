"use client";

import PostList from "@/app/components/posts/PostList";
import { useAuth } from "@/app/hooks/auth";
import { useDrafts } from "@/app/hooks/post";
import Loading from "@/app/loader/Loading";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";

const DraftsPage = () => {
  const { colorMode } = useColorMode();
  const { user, isLoading: userLoading } = useAuth();
  const { posts, isLoading } = useDrafts(user?.id);

  if (userLoading || isLoading) return <Loading />;

  return (
    <Box p={8}>
      <Flex align="center" justify="space-between" mb={8}>
        <Stack>
          <Heading fontWeight={500} fontSize={{ base: "xl", md: "2xl" }}>
            Drafts
          </Heading>
          <Text fontSize={{ base: "sm", md: "md" }}>
            Your unfinished blog posts
          </Text>
        </Stack>
      </Flex>
      <Box bg={colorMode === "light" ? "white" : "gray.700"} rounded="lg" p={4}>
        {/* <Text>Coming soon...</Text> */}
        <PostList posts={posts} link="feed" />
      </Box>
    </Box>
  );
};

export default DraftsPage;
