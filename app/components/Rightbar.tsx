"use client";

import { Box, Flex, Link, Text, useColorMode } from "@chakra-ui/react";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import { px } from "framer-motion";

interface CategoryProps {
  categories: string[];
}

const Rightbar = ({ children }: { children: ReactNode }) => {
  const { colorMode } = useColorMode();
  const categories = [
    "Science",
    "Lifestyle",
    "Travel",
    "Food",
    "Technology",
    "Politics",
  ];

  const latestPosts = [
    {
      title: "Post 1",
      date: "June 10, 2023",
    },
    {
      title: "Post 2",
      date: "June 10, 2023",
    },
    {
      title: "Post 3",
      date: "June 10, 2023",
    },
  ];
  return (
    <>
      <Navbar />
      <Box maxW={"1200px"} mx={"auto"}>
        <Flex
          px={"20px"}
          justify={"space-between"}
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
            // borderTop={"1px solid"}
            // borderTopColor={colorMode === "light" ? "brand.400" : "brand.450"}
          >
            <Box p="4">
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
                  Categories
                </Text>
                <Flex gap={2} flexWrap={"wrap"}>
                  {categories.map((category) => (
                    <Link
                      px={2}
                      py={1}
                      borderRadius={"2xl"}
                      border={"1px solid"}
                      key={category}
                      href=""
                      display="block"
                      mb="2"
                    >
                      {category}
                    </Link>
                  ))}
                </Flex>
              </Box>
              <Box mt="8">
                <Text fontSize="md" fontWeight="bold" mb="4">
                  Recent Posts
                </Text>
                {latestPosts.map((post) => (
                  <Box mb="2" key={post.title}>
                    <Link display="block">{post.title}</Link>
                    <Text
                      fontSize="sm"
                      color={colorMode === "light" ? "brand.900" : "brand.350"}
                    >
                      {post.date}
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
