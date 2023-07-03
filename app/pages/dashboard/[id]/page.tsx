"use client";

import Comments from "@/app/components/Comments";
// import Comments from "@/app/components/comments/Comments";
import { usePost, usePosts } from "@/app/hooks/post";
import { useUser } from "@/app/hooks/user";
import Loading from "@/app/loader/Loading";
import { formatDate } from "@/app/utils/funcns";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import MarkdownIt from "markdown-it";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BsBookmarkCheckFill, BsBookmarkPlus } from "react-icons/bs";
import { VscBook } from "react-icons/vsc";

interface MarkdownProps {
  children: string;
}

// interface MarkdownRendererProps {
//   markdownText: string;
// }
interface PostDetailProps {
  avatar: string;
  name: string;
  role?: string;
  postedOn: any;
  title: string;
  postLength: string;
  intro: string;
  image: string;
}

const Post = () => {
  const { colorMode } = useColorMode();
  const [currentPost, setCurrentPost] = useState<PostDetailProps | any>(null);
  const params = useParams();
  const { id } = params;
  const { posts, isLoading: postsLoading } = usePosts();
  const { user, isLoading: userLoading } = useUser(currentPost?.uid);

  useEffect(() => {
    if (posts?.length === 0) {
      return;
    }

    const selectedPost = posts?.find((post) => post.id === id);
    setCurrentPost(selectedPost);
  }, [posts, id, params]);

  function renderMarkdownToHtml(markdownText: string): React.ReactNode {
    const md = new MarkdownIt();
    const html = md.render(markdownText);
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

  if (postsLoading || userLoading) {
    return <Loading />;
  }

  return (
    <>
      <Box
        borderRadius={"lg"}
        mb={6}
        color={colorMode === "light" ? "brand.800" : "brand.400"}
      >
        <Stack mt={27} mx={{ base: "0px", lg: "44px" }}>
          <Box>
            <Flex justify={"space-between"} w={"full"}>
              <Flex gap={2} mb={"15px"}>
                <Avatar size="md" name={user?.displayName} />
                <Box>
                  <Heading fontSize={"20px"} fontWeight={600} mb={1}>
                    {user?.displayName}
                  </Heading>
                  <HStack flexWrap={"wrap"}>
                    {user?.role ? (
                      <Text>{user?.role}</Text>
                    ) : (
                      <Text>@{user?.email.split("@")[0]}</Text>
                    )}
                    <Box
                      boxSize={"4px"}
                      bg={colorMode === "light" ? "brand.800" : "brand.400"}
                      borderRadius={"full"}
                    />
                    <Text>{formatDate(currentPost?.postedOn)}</Text>
                    <Box
                      boxSize={"4px"}
                      bg={colorMode === "light" ? "brand.800" : "brand.400"}
                      borderRadius={"full"}
                    />
                    <HStack>
                      <Icon as={VscBook} />{" "}
                      <Text>{currentPost?.postLength} mins read</Text>
                    </HStack>
                  </HStack>
                </Box>
              </Flex>
              <Box mr={"-11px"}>
                <IconButton
                  variant={"ghost"}
                  //   onClick={handleBookmark}
                  aria-label="Bookmark"
                  icon={
                    currentPost?.bookmarked ? (
                      <BsBookmarkCheckFill size={"20px"} />
                    ) : (
                      <BsBookmarkPlus size={"20px"} />
                    )
                  }
                />
              </Box>
            </Flex>
            <Flex flex={0.7}>
              {currentPost?.bannerImg && (
                <Image
                  src={currentPost?.bannerImg}
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
              )}
            </Flex>
            <Box>
              <Stack flex={1}>
                <Heading fontWeight={700} fontSize={"34px"} my={"30px"}>
                  {currentPost?.title}
                </Heading>

                {/* <Box>{renderMarkdownToHtml(currentPost?.body)}</Box> */}
                <Box>{currentPost?.body}</Box>
                {/* <Box>
                  <ReactMarkdown children={currentPost?.body} />
                </Box> */}
              </Stack>
            </Box>
          </Box>
          <HStack></HStack>
          <Comments post={currentPost} />
        </Stack>
      </Box>
      {/* ))} */}
    </>
  );
};

export default Post;
