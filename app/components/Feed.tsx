"use client";

import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { ImPencil } from "react-icons/im";
import Post from "./Post";

interface FeedProps {}

const Feed = (props: FeedProps) => {
  return (
    <Box ml={{ base: "", md: "60px" }} px={5} border="1px solid #d0d0d0">
      <Box maxW={"854px"} mx={"auto"}>
        <Flex align={"flex-end"} justify={"space-between"} my={5}>
          <Stack>
            <Heading fontWeight={500} fontSize={28}>
              FEED
            </Heading>
            <Text>Explore different content you’d love </Text>
          </Stack>
          <Button
            bg={"#543EE0"}
            color={"white"}
            _hover={{
              bg: "#715fe3",
            }}
            leftIcon={<ImPencil />}
          >
            Post a content
          </Button>
        </Flex>
        <Flex
          border={"1px solid #d0d0d0"}
          borderRadius={"lg"}
          justify={"space-between"}
          mt={"49px"}
          px={"51px"}
        >
          <Heading
            fontWeight={500}
            fontSize={24}
            py={"16px"}
            borderBottom={"6px solid #543EE0"}
          >
            For you
          </Heading>
          <Heading fontWeight={500} fontSize={24} py={"16px"}>
            Featured
          </Heading>
          <Heading fontWeight={500} fontSize={24} py={"16px"}>
            Recent
          </Heading>
        </Flex>
        <Post />
      </Box>
    </Box>
  );
};

export default Feed;
