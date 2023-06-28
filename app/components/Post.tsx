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
import MarkdownIt from "markdown-it";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { BsBookmarkCheckFill, BsBookmarkPlus } from "react-icons/bs";
import { VscBook } from "react-icons/vsc";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { db } from "../lib/firebase";

interface PostDetailProps {
  avatar: string;
  name: string;
  role: string;
  postedOn: string;
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
  const [author, setAuthor] = useState<DocumentData | any>(null);

  const handleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };
  // if (post.length === 0) return <Loading />;
  console.log(post?.data);

  function renderMarkdownToHtml(markdownText: string): React.ReactNode {
    const md = new MarkdownIt();
    const html = md.render(markdownText);
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const docRef = doc(db, "users", post?.data?.author);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const authorProfile = docSnap.data();
          setAuthor(authorProfile);
        } else {
          return;
        }
      } catch (error) {
        return;
      }
    };

    fetchAuthorData();
  }, [post?.data?.author]);
  console.log("Author ==> ", author);

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
              <Avatar size="md" name={"John Doe"} src={author?.avatar} />
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
                </HStack>
              </Box>
            </Flex>
            <Flex flexDir={{ base: "column-reverse", lg: "row" }}>
              <Stack flex={1} mr={{ base: "0", lg: "22px" }}>
                <Heading fontWeight={500} fontSize={"24px"} mt={"10px"}>
                  {post?.data?.title}
                </Heading>
                <HStack>
                  <Icon as={VscBook} />{" "}
                  <Text>{post?.data?.postLength} mins read</Text>
                </HStack>
                <Text fontSize={"18px"} mt={"10px"}>
                  {renderMarkdownToHtml(post?.data?.body.split(". ")[0])}
                </Text>
              </Stack>
              <Flex flex={0.7}>
                <Image
                  src={post?.data?.bannerImg}
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
            {post?.data?.tags?.map((item: string, i: number) => (
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
