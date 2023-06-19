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
  Spacer,
  Stack,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import { VscBook } from "react-icons/vsc";
import { IoChatbubblesOutline } from "react-icons/io5";
import { SlLike } from "react-icons/sl";
import { MdInsertChartOutlined } from "react-icons/md";
import { IconType } from "react-icons";
import { BsBookmarkCheckFill, BsBookmarkPlus } from "react-icons/bs";
// import Loading from "../pages/dashboard/loading";
// import { useRouter } from "next/router";

interface PostDetailProps {
  avatar: string;
  name: string;
  role: string;
  date: string;
  title: string;
  readTime: string;
  intro: string;
  bannerUrl: string;
  alt: string;
  bookmarked: boolean;
  tags: string[];
  footer?: {
    icon: IconType;
    count?: number;
  }[];
}

const Post = ({ post }: any) => {
  const { colorMode } = useColorMode();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };
  // if (post.length === 0) return <Loading />;

  return (
    <Box
      border={"1px solid "}
      borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
      borderRadius={"lg"}
      mb={6}
      color={colorMode === "light" ? "brand.800" : "brand.400"}
    >
      <Stack mt={27} mx={{ base: "24px", lg: "44px" }}>
        <Link
          href={`/pages/dashboard/${post.id}`}
          _hover={{
            textDecoration: "none",
            // color: "gray.800",
            // color: colorMode === "light" ? "brand.800" : "gray.200",
          }}
          w={"full"}
        >
          <Box>
            <Flex gap={2} mb={"10px"}>
              <Avatar size="md" name={"John Doe"} src={post.data.bannerImg} />
              <Box>
                <Heading fontSize={"20px"} fontWeight={600} mb={1}>
                  {post.data.author}
                </Heading>
                <HStack flexWrap={"wrap"}>
                  <Text>{post.data.role}</Text>
                  <Box
                    boxSize={"4px"}
                    bg={colorMode === "light" ? "brand.800" : "brand.400"}
                    borderRadius={"full"}
                  />
                  {/* <Spacer /> */}
                  {/* <Text>{post.data.postedOn}</Text> */}
                  <Text>
                    {new Date(post.data.postedOn).toLocaleString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </Text>
                </HStack>
              </Box>
            </Flex>
            <Flex flexDir={{ base: "column-reverse", lg: "row" }}>
              <Stack flex={1} mr={{ base: "0", lg: "22px" }}>
                <Heading fontWeight={500} fontSize={"24px"} mt={"10px"}>
                  {post.data.title}
                </Heading>
                <HStack>
                  <Icon as={VscBook} />{" "}
                  <Text>{post.data.postLength} mins read</Text>
                </HStack>
                <Text fontSize={"18px"} mt={"10px"}>
                  {post.data.body.split(". ")[0]}
                </Text>
              </Stack>
              <Flex flex={0.7}>
                <Image
                  src={post.data.bannerImg}
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
          </Box>
        </Link>
        <HStack>
          <Box>
            <IconButton
              variant={"ghost"}
              onClick={handleBookmark}
              aria-label="Bookmark"
              icon={
                isBookmarked ? (
                  <BsBookmarkCheckFill size={"20px"} />
                ) : (
                  <BsBookmarkPlus size={"20px"} />
                )
              }
            />
          </Box>
          <HStack>
            {post.data.tag?.map((item: string, i: number) => (
              <Button
                variant={"outline"}
                px={"8px"}
                h={"32px"}
                fontSize={"14px"}
                key={i}
              >
                {item}
                {/* {i > 1 && `+${item.tags.length - 2}`} */}
              </Button>
            ))}
          </HStack>
        </HStack>
        {/* <Flex justify={"flex-end"}>
            <HStack gap={"20%"}>
              {item.footer?.map((footerItem, i) => (
                <Button key={i} variant={"ghost"}>
                  <Icon as={footerItem.icon} mr={1} />
                  <Text>{footerItem.count}</Text>
                </Button>
              ))}
            </HStack>
          </Flex> */}
      </Stack>
    </Box>
  );
};

export default Post;
