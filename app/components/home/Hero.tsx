"use client";

import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  const { colorMode } = useColorMode();
  return (
    <Center
      h="90vh"
      backgroundImage="/images/team.webp"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      <Center
        h="100%"
        w="100%"
        bgGradient="linear(to-l, #0000009b, #0000009b)"
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
            <Center
              maxW="400px"
              bg="brand.600"
              color="white"
              _hover={{ bg: "brand.700" }}
              py="10px"
              px="25px"
              borderRadius="md"
              fontWeight={600}
            >
              <Link href="/pages/signin">Get Started</Link>
            </Center>
            <Center
              maxW="400px"
              bg="brand.600"
              color="white"
              _hover={{ bg: "brand.700" }}
              py="10px"
              px="35px"
              borderRadius="md"
              fontWeight={600}
            >
              <Link href="/pages/feed">Feed</Link>
            </Center>
          </Flex>
        </Box>
      </Center>
    </Center>
  );
};

export default Hero;
