"use client";

import { ChatterContext } from "@/app/context/ChatterContext";
import { auth, db } from "@/app/lib/firebase";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { IconType } from "react-icons";
import { BsBookmarkCheckFill, BsBookmarkPlus } from "react-icons/bs";
import { VscBook } from "react-icons/vsc";
import { useParams } from "next/navigation";
// import MarkdownWrapper from "@/app/components/MarkdownWrapper";
import ReactMarkdown from "react-markdown";
import Loading from "@/app/loader/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import Recommendation from "@/app/components/Rightbar";

interface MarkdownProps {
  children: string;
}

interface PostDetailProps {
  avatar: string;
  name: string;
  role: string;
  date: string;
  title: string;
  readTime: string;
  intro: string;
  image: string;
  alt: string;
  // bookmarked: boolean;
  tags: string[];
  footer?: {
    icon: IconType;
    count?: number;
  }[];
}

const Post = () => {
  const { colorMode } = useColorMode();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { posts } = useContext(ChatterContext);
  const [user, loading, error] = useAuthState(auth);

  console.log("Post => ", user);

  const [post, setPost] = useState<PostDetailProps | any>(null);
  const params = useParams();

  const handleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  useEffect(() => {
    if (posts.length === 0) {
      return;
    }

    const { id } = params;
    const selectedPost = posts.find((post) => post.id === id);
    setPost(selectedPost);
  }, [post, posts, params]);

  if (!post) {
    return <Loading />;
  }

  return (
    <>
      <Recommendation>
        <Box
          borderRadius={"lg"}
          mb={6}
          color={colorMode === "light" ? "brand.800" : "brand.400"}
        >
          <Stack mt={27} mx={{ base: "0px", lg: "44px" }}>
            <Box>
              <Flex gap={2} mb={"15px"}>
                <Avatar size="md" name={post?.data?.author} />
                <Box>
                  <Heading fontSize={"20px"} fontWeight={600} mb={1}>
                    {post?.data?.author}
                  </Heading>
                  <HStack flexWrap={"wrap"}>
                    <Text>{post?.data?.role}</Text>
                    <Box
                      boxSize={"4px"}
                      bg={colorMode === "light" ? "brand.800" : "brand.400"}
                      borderRadius={"full"}
                    />
                    <Text>{post?.data?.postedOn}</Text>
                    <HStack>
                      <Icon as={VscBook} />{" "}
                      <Box border={"1px solid blue"}>
                        <Text>{post?.data?.postLength} mins read</Text>
                      </Box>
                    </HStack>
                  </HStack>
                </Box>
              </Flex>
              <Flex flex={0.7}>
                <Image
                  src={post?.data?.bannerImg}
                  width={612}
                  height={242}
                  alt="img"
                  style={{
                    width: "812px",
                    objectFit: "cover",
                    height: "442px",
                    objectPosition: "center",
                  }}
                />
              </Flex>
              <Box>
                <Stack flex={1}>
                  <Heading fontWeight={700} fontSize={"34px"} mt={"10px"}>
                    {post?.data?.title}
                  </Heading>
                  <HStack>
                    <Icon as={VscBook} />{" "}
                    <Box border={"1px solid red"}>
                      <Text>{post?.data?.postLength} mins read</Text>
                    </Box>
                  </HStack>
                  <Text fontSize={"18px"} mt={"10px"}>
                    {post?.data?.body}
                  </Text>
                </Stack>
              </Box>
            </Box>
            <HStack>
              {/* <Box>
              <IconButton
                variant={"ghost"}
                onClick={handleBookmark}
                aria-label="Bookmark"
                icon={
                  post?.data?.bookmarked ? (
                    <BsBookmarkCheckFill size={"20px"} />
                  ) : (
                    <BsBookmarkPlus size={"20px"} />
                  )
                }
              />
            </Box> */}
              {/* <HStack>
            {post?.data?.tags.map((tag, i) => (
              <Button
                variant={"outline"}
                px={"8px"}
                h={"32px"}
                fontSize={"14px"}
                key={i}
              >
                {tag}
                // {i > 1 && `+${post?.data?.tags.length - 2}`}
              </Button>
            ))}
          </HStack> */}
            </HStack>
            {/* <Flex justify={"flex-end"}>
          <HStack gap={"20%"}>
            {post?.data?.footer?.map((footerpost?.data?, i) => (
              <Button key={i} variant={"ghost"}>
                <Icon as={footerpost?.data?.icon} mr={1} />
                <Text>{footerpost?.data?.count}</Text>
              </Button>
            ))}
          </HStack>
        </Flex> */}
          </Stack>
        </Box>
        {/* ))} */}
      </Recommendation>
    </>
  );
};

export default Post;
