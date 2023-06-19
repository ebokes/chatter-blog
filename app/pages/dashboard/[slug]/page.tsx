"use client";

import { ChatterContext } from "@/app/context/ChatterContext";
import { db } from "@/app/lib/firebase";
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
import { usePathname, useSearchParams } from "next/navigation";
import Loading from "../Loading";

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

// const PostDetail: Array<PostDetailProps> = [
//   {
//     avatar: "/avatar1.svg",
//     name: "Grace Ikpang",
//     role: "Product designer",
//     date: "May 25th, 2023",
//     title: "A Comprehensive Guide to Starting Up a Tech Company",
//     readTime: "10 mins read",
//     intro:
//       "Introduction Starting a tech company is an exciting and challenging endeavor that requires careful planning and execution. In todays digital age, technology plays a pivotal role in shaping industries and transforming society. This 1000-word write-up aims to provide a comprehensive guide to help aspiring entrepreneurs navigate the process of starting a successful tech company. Before diving into the technical aspects, it's crucial to identify your niche and define your vision for the company. Consider your passion, skills, and expertise to determine the specific area of technology you want to focus on. Conduct market research to identify gaps, emerging trends, and potential customer needs within your chosen niche. This will help you shape your company's unique value proposition. A well-structured business plan acts as a roadmap for your tech company's success. Outline your business objectives, target market, competitive analysis, marketing strategies, and financial projections. A business plan serves as a reference point and helps you attract potential investors or secure financing.A successful tech company relies on a talented and dedicated team. Surround yourself with individuals who complement your skills and share your vision. Identify the key roles required for your company, such as developers, designers, marketers, and business strategists. Recruit individuals with relevant experience, a strong work ethic, and a passion for technology.",

//     image: "/img.jpeg",
//     alt: "img",
//     bookmarked: false,
//     tags: ["Design", "Product", "UX", "UI", "Figma", "Sketch"],
//   },
// ];

interface PostProps {
  params: { post: string };
}

// export interface Posts {
//   id: string;
//   data: {
//     author: string;
//     title: string;
//     role: string;
//     postedOn: any;
//     category: string;
//     bannerImg: string;
//     body: string;
//     postLength: number;
//     tag: string[];
//   };
// }

// interface PostDetailProps {
//   author: string;
//   title: string;
//   role: string;
//   postedOn: any;
//   category: string;
//   bannerImg: string;
//   body: string;
//   postLength: number;
//   tag: string[];
// footer?: {
//   icon: JSX.Element;
//   count?: number;
// }[];
// }

const Post = () => {
  const { colorMode } = useColorMode();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { posts } = useContext(ChatterContext);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [post, setPost] = useState<PostDetailProps | any>(null);

  const handleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };
  // const [posts, setPosts] = useState<Posts[]>([]);

  // const [postDetail, setPostDetail] = useState<PostDetailProps | null>(null);

  useEffect(() => {
    if (posts.length === 0) {
      return;
    }
    const url = `${pathname}?${searchParams}`;
    // console.log(url);
    // console.log(posts);
    // const id url.split("/")[2];
    const id = url.split("/").pop()?.replace("?", "");
    const selectedPost = posts.find((post) => post.id === id);
    // console.log(id);
    // console.log(selectedPost);
    setPost(selectedPost);
  }, [post, posts, pathname, searchParams]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* {postDetail.map((post) => ( */}
      <Box
        // border={"1px solid "}
        // borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
        borderRadius={"lg"}
        // key={post.id}
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
                  {/* <Spacer /> */}
                  <Text>
                    {new Date(post?.data?.postedOn).toLocaleString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </Text>
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
                  <Text>{post?.data?.postLength} mins read</Text>
                </HStack>
                <Text fontSize={"18px"} mt={"10px"}>
                  {post?.data?.body}
                </Text>
              </Stack>
            </Box>
          </Box>
          <HStack>
            <Box>
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
            </Box>
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
    </>
  );
};

export default Post;
