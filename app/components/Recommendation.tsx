"use client";

import {
  Box,
  Flex,
  Heading,
  Input,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";

const Recommendation = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      minW={"350px"}
      display={{ base: "none", md: "block" }}
      pt={"50px"}
      bg={colorMode === "light" ? "brand.300" : "brand.800"}
      borderLeft={"1px solid"}
      borderLeftColor={colorMode === "light" ? "brand.400" : "brand.450"}
      position={"sticky"}
      top={"0px"}
      h={"100vh"}
    >
      <Box p="4">
        <Flex direction="column" align="center" mb="8">
          <Text fontSize="xl" fontWeight="bold">
            Recommendations
          </Text>
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
          <Link href="" display="block" mb="2">
            Technology
          </Link>
          <Link display="block" mb="2">
            Science
          </Link>
          <Link display="block" mb="2">
            Lifestyle
          </Link>
          <Link display="block" mb="2">
            Travel
          </Link>
        </Box>
        <Box mt="8">
          <Text fontSize="md" fontWeight="bold" mb="4">
            Recent Posts
          </Text>
          <Box mb="2">
            <Link display="block">Post 1</Link>
            <Text
              fontSize="sm"
              color={colorMode === "light" ? "brand.900" : "brand.350"}
            >
              Posted on June 15, 2023
            </Text>
          </Box>
          <Box mb="2">
            <Link display="block">Post 2</Link>
            <Text
              fontSize="sm"
              color={colorMode === "light" ? "brand.900" : "brand.350"}
            >
              Posted on June 10, 2023
            </Text>
          </Box>
          <Box mb="2">
            <Link display="block">Post 3</Link>
            <Text
              fontSize="sm"
              color={colorMode === "light" ? "brand.900" : "brand.350"}
            >
              Posted on June 5, 2023
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Recommendation;
