"use client";
import {
  Flex,
  HStack,
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
import Loading from "../loader/Loading";
import PostList from "./posts/PostList";

const Feed = () => {
  const { posts, isLoading: postsLoading } = usePosts();
  const { user: authUser, isLoading: authLoading } = useAuth();
  const { posts: postsUid, isLoading: postsUidLoading } = usePostsUid(
    authUser?.id
  );
  const { colorMode } = useColorMode();

  if (authLoading) return <Loading />;

  return (
    <>
      <Flex align={"flex-end"} justify={"space-between"} my={5}>
        <Stack>
          <Heading fontWeight={500} fontSize={{ base: 24, md: 28 }}>
            FEED
          </Heading>
          <Text>Explore different content you’d love </Text>
        </Stack>
      </Flex>

      <Tabs position="relative" variant="unstyled" mb={"30px"}>
        <TabList
          minW={"full"}
          border={`1px solid ${
            colorMode === "dark" ? "rgb(255, 255, 255, .2)" : "#d0d0d0"
          }`}
          h={{ base: "60px", md: "80px" }}
          // py=".5rem"
          borderRadius={"5px"}
          display={"flex"}
          justifyContent={"space-between"}
          textAlign={"center"}
          overflowX={"scroll"}
        >
          <HStack
            // minW={"300px"}
            justify={"space-between"}
            w={"100%"}
            spacing={"5px"}
          >
            <Tab>
              <Heading
                fontWeight={500}
                fontSize={{ base: 18, md: 24 }}
                py={"16px"}
              >
                General
              </Heading>
            </Tab>
            <Tab w={"109px"}>
              <Heading
                fontWeight={500}
                fontSize={{ base: 18, md: 24 }}
                py={"16px"}
                minW={"100px"}
                // border={"1px solid red"}
              >
                My Feed
              </Heading>
            </Tab>
            <Tab>
              <Heading
                fontWeight={500}
                fontSize={{ base: 18, md: 24 }}
                py={"16px"}
              >
                Recent
              </Heading>
            </Tab>
          </HStack>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2.5px"
          bg="#543EE0"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel p="0">
            <PostList
              posts={posts}
              isLoading={postsLoading}
              link={"dashboard"}
            />
          </TabPanel>
          <TabPanel p={0}>
            <PostList
              posts={postsUid}
              isLoading={postsUidLoading}
              link="dashboard"
            />
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
