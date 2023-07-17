"use client";

import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";

const DraftsComp = () => {
  const { colorMode } = useColorMode();

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
        <Text>Coming soon...</Text>
        {/* <PostList 
          posts={draftPostsData}
           link="edit" /> */}
      </Box>
    </Box>
  );
};

export default DraftsComp;
