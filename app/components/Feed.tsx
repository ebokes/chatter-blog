"use client";
import { useContext } from "react";
import {
  Box,
  Button,
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
import React from "react";
import { ImPencil } from "react-icons/im";
import Post from "./Post";
import Link from "next/link";
import { ChatterContext } from "../context/ChatterContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { useAuth } from "../hooks/auth";

const Feed = () => {
  const { posts } = useContext(ChatterContext);
  const { colorMode } = useColorMode();
  const { user, isLoading } = useAuth();

  return (
    <>
      <Flex align={"flex-end"} justify={"space-between"} my={5}>
        <Stack>
          <Heading fontWeight={500} fontSize={28}>
            FEED
          </Heading>
          <Text>Explore different content you’d love </Text>
        </Stack>

        {user && (
          <Button
            as={Link}
            href={"/pages/dashboard/write"}
            bg={"brand.600"}
            color={"white"}
            _hover={{
              bg: "brand.700",
            }}
            leftIcon={<ImPencil />}
            // display={user ? "unset" : "none"}
          >
            Write
          </Button>
        )}
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
          // px={{ base: "0rem", md: "1rem" }}
        >
          <Tab>
            <Heading fontWeight={500} fontSize={24} py={"16px"}>
              For you
            </Heading>
          </Tab>
          <Tab>
            <Heading fontWeight={500} fontSize={24} py={"16px"}>
              Featured
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
            <Box
              // border={"1px solid"}
              // borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
              borderRadius={"lg"}
              // justify={"space-between"}
              mt={"19px"}
              // px={{ base: "24px", lg: "44px" }}
              //  px={"51px"}
            >
              {posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </Box>
          </TabPanel>
          <TabPanel>
            <p>Featured</p>
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
