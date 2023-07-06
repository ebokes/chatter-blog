"use client";
import {
  Flex,
  Heading,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useAuth } from "../hooks/auth";
import { usePosts, usePostsUid } from "../hooks/post";
import PostList from "./posts/PostList";
// import PostList from "./PostList";

const Feed = () => {
  const { posts, isLoading: postsLoading } = usePosts();
  const { user: authUser, isLoading: authLoading } = useAuth();
  const { posts: postsUid, isLoading: postsUidLoading } = usePostsUid(
    authUser?.id
  );
  const { colorMode } = useColorMode();

  // console.log(posts?.category);

  if (authLoading) return <div>Loading...</div>;

  return (
    <>
      <Flex align={"flex-end"} justify={"space-between"} my={5}>
        <Stack>
          <Heading fontWeight={500} fontSize={28}>
            FEED
          </Heading>
          <Text>Explore different content you’d love </Text>
        </Stack>
      </Flex>

      <Tabs position="relative" variant="unstyled">
        <TabList
          minW={"full"}
          border={`1px solid ${
            colorMode === "dark" ? "rgb(255, 255, 255, .2)" : "#d0d0d0"
          }`}
          // py=".5rem"
          borderRadius={"10px"}
          display={"flex"}
          justifyContent={"space-between"}
          textAlign={"center"}
          // px={{ base: "0rem", md: "1rem" }}
        >
          <Tab>
            <Heading fontWeight={500} fontSize={24} py={"16px"}>
              General
            </Heading>
          </Tab>
          <Tab>
            <Heading fontWeight={500} fontSize={24} py={"16px"}>
              My Feed
            </Heading>
          </Tab>
          <Tab>
            <Heading fontWeight={500} fontSize={24} py={"16px"}>
              Recent
            </Heading>
          </Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2.5px"
          bg="#543EE0"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel p="0">
            {postsLoading ? (
              <Text>Posts are loading</Text>
            ) : (
              <PostList posts={posts} />
            )}
          </TabPanel>
          <TabPanel p={0}>
            {postsUidLoading ? (
              <Text>Posts are loading</Text>
            ) : (
              <PostList posts={postsUid} />
            )}
          </TabPanel>
          <TabPanel>
            <p>Recent</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Feed;
