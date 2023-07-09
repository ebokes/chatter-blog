"use client";

import {
  Box,
  Center,
  Flex,
  Heading,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

const Hero = () => {
  const { colorMode } = useColorMode();
  return (
    <Center
      h="764px"
      backgroundImage="/images/writer.webp"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      <Center
        h="100%"
        w="100%"
        bgGradient="linear(to-l, #0000007f, #0000007f)"
        px={"32px"}
        mx={"auto"}
      >
        <Box
          maxW="850px"
          color={colorMode === "light" ? "brand.100" : "gray.200"}
        >
          <Heading fontSize="48px">
            Welcome to Chatter: A Haven for Text-Based Content
          </Heading>
          <Text mb="36px" mt="24px" fontSize="24px">
            Unleash the Power of Words, Connect with Like-minded Readers and
            Writers
          </Text>
          <Flex gap={5}>
            <Link
              as={NextLink}
              href="/pages/signin"
              maxW="400px"
              bg="brand.600"
              color="white"
              _hover={{ bg: "brand.700" }}
              py="10px"
              px="25px"
              borderRadius="md"
              fontWeight={600}
            >
              Get Started
            </Link>
            <Link
              as={NextLink}
              href="/pages/feed"
              maxW="400px"
              bg="brand.600"
              color="white"
              _hover={{ bg: "brand.700" }}
              py="10px"
              px="35px"
              borderRadius="md"
              fontWeight={600}
            >
              Feed
            </Link>
          </Flex>
        </Box>
      </Center>
    </Center>
  );
};

export default Hero;
