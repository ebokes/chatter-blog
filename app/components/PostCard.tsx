"use client";

import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { BsBookmarkCheckFill, BsBookmarkPlus } from "react-icons/bs";
import { VscBook } from "react-icons/vsc";
import { useUser } from "../hooks/user";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";

const PostCard = ({ post }: any) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      border={"1px solid "}
      borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
      borderRadius={"lg"}
      mb={6}
      color={colorMode === "light" ? "brand.800" : "brand.400"}
      pb={"20px"}
    >
      <Stack mt={27} mx={{ base: "24px", lg: "44px" }}>
        <PostHeader post={post} />
        <Box>
          <Link
            href={`/pages/dashboard/${post.id}`}
            _hover={{
              textDecoration: "none",
              // color: "gray.800",
              // color: colorMode === "light" ? "brand.800" : "gray.200",
            }}
            w={"full"}
          >
            <Flex flexDir={{ base: "column-reverse", lg: "row" }}>
              <Stack flex={1} mr={{ base: "0", lg: "22px" }}>
                <Heading fontWeight={500} fontSize={"24px"} mt={"10px"}>
                  {post?.title}
                </Heading>
                <HStack>
                  <Icon as={VscBook} />{" "}
                  <Text>{post?.postLength} mins read</Text>
                </HStack>
                <Text fontSize={"18px"} mt={"10px"}>
                  {/* {renderMarkdownToHtml(post?.body.split(". ")[0])} */}
                  {post?.intro}
                </Text>
              </Stack>
              <Flex flex={0.7}>
                <Image
                  src={post?.bannerImg}
                  width={312}
                  height={242}
                  alt="img"
                  priority={false}
                  style={{
                    borderRadius: "10px",
                    objectFit: "cover",
                    height: "200px",
                  }}
                />
              </Flex>
            </Flex>
          </Link>
        </Box>
        <PostActions post={post} />
      </Stack>
    </Box>
  );
};

export default PostCard;
