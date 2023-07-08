"use client";

// import Comments from "@/app/components/Comments";
// import Comments from "@/app/components/comments/Comments";
import { PostProps, usePost, usePosts } from "@/app/hooks/post";
import { useUser } from "@/app/hooks/user";
import Loading from "@/app/loader/Loading";
import { formatDate } from "@/app/utils/funcns";
import {
  Avatar,
  Box,
  Button,
  Center,
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
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BsBookmarkCheckFill, BsBookmarkPlus } from "react-icons/bs";
import { VscBook } from "react-icons/vsc";
import Comments from "../comments/CommentWrapper";
import { useAuth } from "@/app/hooks/auth";
// import Avatar from "../Avatar";

const Post = () => {
  const { colorMode } = useColorMode();
  const [currentPost, setCurrentPost] = useState<PostProps | any>(null);
  const params = useParams();
  const { id } = params;
  const { posts, isLoading: postsLoading } = usePosts();
  const { user, isLoading: userLoading } = useUser(currentPost?.uid);
  const { user: userAuth } = useAuth();

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

  if (postsLoading || userLoading || !user) {
    return <Loading />;
  }

  return (
    <>
      <Box
        borderRadius={"lg"}
        mb={6}
        color={colorMode === "light" ? "brand.800" : "brand.400"}
        // border={"1px solid red"}
      >
        <Stack mt={27}>
          <Box>
            <Flex justify={"space-between"} w={"full"}>
              <Flex gap={2} mb={"15px"}>
                <Avatar
                  size="md"
                  name={user?.displayName}
                  as={Link}
                  href={`/pages/profile/${user?.id}`}
                  _hover={{ cursor: "pointer", opacity: "0.8" }}
                />
                {/* <Avatar user={user} /> */}
                <Box>
                  <HStack>
                    <Heading
                      fontSize={"20px"}
                      fontWeight={600}
                      mb={1}
                      as={Link}
                      href={`/pages/profile/${user?.id}`}
                    >
                      {user?.displayName}
                    </Heading>
                    {/* <Text
                      color="green"
                      variant={"ghost"}
                      display={"inline"}
                      ml={"20px"}
                      cursor={"pointer"}
                    >
                      Follow
                    </Text> */}
                    {userAuth?.id !== user?.id && (
                      <Button
                        color="green"
                        // variant={"ghost"}
                        display={"inline"}
                        ml={"10px"}
                        cursor={"pointer"}
                        px={2}
                        h={"30px"}
                        mb={1}
                      >
                        Follow
                      </Button>
                    )}
                  </HStack>
                  <HStack flexWrap={"wrap"}>
                    {user?.role ? (
                      <Text>{user?.role}</Text>
                    ) : (
                      <Text>@{user?.email?.split("@")[0]}</Text>
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
            <Center flex={0.7}>
              {currentPost?.bannerImg && (
                <Image
                  src={currentPost?.bannerImg}
                  width={612}
                  height={242}
                  alt="banner image"
                  style={{
                    // width: "full",
                    objectFit: "cover",
                    // height: "442px",
                    objectPosition: "center",
                  }}
                />
              )}
            </Center>
            <Box>
              <Stack flex={1}>
                <Heading
                  my={"30px"}
                  fontSize={{ base: "28px", md: "34px" }}
                  fontWeight={700}
                >
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
          {/* <HStack></HStack> */}
          <Comments post={currentPost} />
        </Stack>
      </Box>
      {/* ))} */}
    </>
  );
};

export default Post;
