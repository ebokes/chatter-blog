"use client";

import { usePost } from "@/app/hooks/post";
import { useUser } from "@/app/hooks/user";
import Loading from "@/app/loader/Loading";
import { formatDate, getCapitalizedName } from "@/app/utils/funcns";
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
import { VscBook } from "react-icons/vsc";
import CategoryBtn from "../CategoryBtn";
import { FloatingNav } from "../FloatingNav";
import { MarkdownRenderer } from "../MarkdownRenderer";
import CommentWrapper from "../comments/CommentWrapper";

const PostPage = () => {
  const { colorMode } = useColorMode();
  const params = useParams();
  const { id } = params;
  const { post: currentPost, isLoading: postsLoading } = usePost(id);
  const { user, isLoading: userLoading } = useUser(currentPost?.uid);

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
        <Stack mt={27} px={2} mx={2}>
          <Box>
            <Flex justify={"space-between"} w={"full"}>
              <Flex gap={2} mb={"15px"}>
                <Link href={`/pages/profile/${user?.id}`}>
                  <Avatar
                    size="md"
                    name={user?.displayName}
                    src={user?.avatar}
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
                    <Text>@{user?.email?.split("@")[0]}</Text>
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
                    <CategoryBtn>
                      {getCapitalizedName(currentPost?.category)}
                    </CategoryBtn>
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
                <MarkdownRenderer markdownContent={currentPost?.body} />
              </Stack>
            </Box>
          </Box>
          {currentPost && <CommentWrapper post={currentPost} />}
        </Stack>
        {/* <FloatingNav /> */}
      </Box>
    </>
  );
};

export default PostPage;