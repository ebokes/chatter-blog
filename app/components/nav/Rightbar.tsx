"use client";

import { PostProps, usePosts } from "@/app/hooks/post";
import {
  getCapitalizedName,
  sortPost,
  formatPostedOn,
} from "@/app/utils/funcns";
import {
  Box,
  Center,
  Flex,
  Skeleton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import CategoriesSkeleton from "@/app/loader/CategoriesSkeleton";

const Rightbar = ({ children }: { children: ReactNode }) => {
  const { colorMode } = useColorMode();
  const { posts, isLoading } = usePosts();
  const recentPosts = sortPost(posts);

  return (
    <>
      <Navbar />
      <Box
        maxW={"1200px"}
        mx={"auto"}
        mb={"30px"}
        className={"hide-scrollbar"}
        h={"100%"}
      >
        <Flex
          px={{ base: "5px", sm: "10px", md: "20px" }}
          justify={{ base: "center", md: "space-between" }}
          w={"full"}
          gap={6}
          overflowY={"scroll"}
          h={"100vh"}
          className={"hide-scrollbar"}
        >
          {children}
          <Box
            minW={"350px"}
            display={{ base: "none", lg: "block" }}
            mt={"40px"}
            bg={colorMode === "light" ? "brand.300" : "brand.800"}
            border={"1px solid"}
            borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
            position={"sticky"}
            top={"0px"}
            h={"100vh"}
            borderRadius={"lg"}
          >
            <Box
              p="4"
              overflowY={"scroll"}
              h={"100vh"}
              className={"hide-scrollbar"}
            >
              <Flex direction="column" align="center" mb="8">
                <Text
                  fontSize="sm"
                  color={colorMode === "light" ? "brand.900" : "brand.350"}
                >
                  Explore our articles
                </Text>
              </Flex>
              <Box>
                <Text fontSize="md" fontWeight="bold" mb="4">
                  Top Categories
                </Text>
                {isLoading ? (
                  <CategoriesSkeleton />
                ) : (
                  <Flex gap={2} flexWrap={"wrap"}>
                    {Array.from(
                      new Set(posts?.map((post) => post.category))
                    ).map((category) => (
                      <Center
                        px={3}
                        py={"4px"}
                        h={"full"}
                        borderRadius={"3xl"}
                        key={category}
                        display="block"
                        mb="1"
                        bg="blue.500"
                        color="white"
                        fontSize={"sm"}
                        _hover={{
                          textDecoration: "none",
                          bg: "blue.400",
                          transform: "scale(1.05)",
                        }}
                        transition={"all 0.2s ease-in-out"}
                      >
                        <Skeleton isLoaded={!isLoading}>
                          <Link href={`/pages/categories/${category}`}>
                            {getCapitalizedName(category)}
                          </Link>
                        </Skeleton>
                      </Center>
                    ))}
                  </Flex>
                )}
              </Box>
              <Box mt="8">
                <Text fontSize="md" fontWeight="bold" mb="4">
                  Recent Posts
                </Text>
                {recentPosts?.map((post: PostProps) => (
                  <Box
                    mb="2"
                    key={post.title}
                    fontWeight={500}
                    transition={"all 0.2s ease-in-out"}
                    _hover={{ transform: "scale(1.02)" }}
                    border={"1px solid"}
                    borderColor={
                      colorMode === "light" ? "brand.400" : "brand.450"
                    }
                    borderRadius={"lg"}
                    p={2}
                  >
                    <Skeleton isLoaded={!isLoading}>
                      <Link href={`/pages/feed/${post.id}`}>{post.title}</Link>
                    </Skeleton>
                    <Text
                      fontSize="sm"
                      color={colorMode === "light" ? "brand.900" : "brand.350"}
                    >
                      {formatPostedOn(post?.postedOn)}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Rightbar;
