"use client";

import { useAuth } from "@/app/hooks/auth";
import { PostProps, usePosts } from "@/app/hooks/post";
import { useUser } from "@/app/hooks/user";
import Loading from "@/app/loader/Loading";
import { formatDate } from "@/app/utils/funcns";
import {
  Avatar,
  Box,
  Center,
  Flex,
  HStack,
  Heading,
  Icon,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { VscBook } from "react-icons/vsc";
import Comments from "../comments/CommentWrapper";

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

  // function renderMarkdownToHtml(markdownText: string): React.ReactNode {
  //   const md = new MarkdownIt();
  //   const html = md.render(markdownText);
  //   return <div dangerouslySetInnerHTML={{ __html: html }} />;
  // }

  if (postsLoading || userLoading || !user) {
    return <Loading />;
  }

  return (
    <>
      <Box
        borderRadius={"lg"}
        mb={6}
        color={colorMode === "light" ? "brand.800" : "brand.400"}
      >
        <Stack mt={27}>
          <Box>
            <Flex justify={"space-between"} w={"full"}>
              <Flex gap={2} mb={"15px"}>
                <Link href={`/pages/profile/${user?.id}`}>
                  <Avatar
                    size="md"
                    name={user?.displayName}
                    _hover={{ cursor: "pointer", opacity: "0.8" }}
                  />
                </Link>
                <Box>
                  <HStack>
                    <Link href={`/pages/profile/${user?.id}`}>
                      <Heading fontSize={"20px"} fontWeight={600} mb={1}>
                        {user?.displayName}
                      </Heading>
                    </Link>
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
            </Flex>
            <Center flex={0.7}>
              {currentPost?.bannerImg && (
                <Image
                  src={currentPost?.bannerImg}
                  width={612}
                  height={242}
                  alt="banner image"
                  style={{
                    objectFit: "cover",
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
