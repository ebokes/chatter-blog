"use client";

import { usePosts } from "@/app/hooks/post";
import { formatDate, getCapitalizedName } from "@/app/utils/funcns";
import {
  Box,
  Button,
  Center,
  Flex,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Link from "next/link";

const Rightbar = ({ children }: { children: ReactNode }) => {
  const { colorMode } = useColorMode();
  const { posts, isLoading } = usePosts();
  const sortedPosts = posts?.sort((a, b) => b.postedOn - a.postedOn);
  const recentPosts = sortedPosts?.slice(0, 5);

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
                {/* <Text fontSize="xl" fontWeight="bold">
                  Rightbars
                </Text> */}
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
                <Flex gap={2} flexWrap={"wrap"}>
                  {Array.from(
                    new Set(
                      posts?.map((post) => getCapitalizedName(post.category))
                    )
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
                      <Link href="/pages/feed">{category}</Link>
                    </Center>
                  ))}
                </Flex>
              </Box>
              <Box mt="8">
                <Text fontSize="md" fontWeight="bold" mb="4">
                  Recent Posts
                </Text>
                {recentPosts?.map((post) => (
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
                    {/* <Skeleton isLoaded={!isLoading}> */}
                    <Link href={`/pages/feed/${post.id}`}>{post.title}</Link>
                    {/* </Skeleton> */}
                    <Text
                      fontSize="sm"
                      color={colorMode === "light" ? "brand.900" : "brand.350"}
                    >
                      {formatDate(post.postedOn)}
                    </Text>
                  </Box>
                ))}
              </Box>
              <Box>{/* <Card /> */}</Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Rightbar;
