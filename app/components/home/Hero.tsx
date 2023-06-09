"use client";

import { Box, Center, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

const Hero = () => {
  return (
    <Center
      h="764px"
      backgroundImage="/writer.webp"
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
        <Box maxW="850px" color="white">
          <Heading fontSize="48px">
            Welcome to Chatter: A Haven for Text-Based Content
          </Heading>
          <Text mb="36px" mt="24px" fontSize="24px">
            Unleash the Power of Words, Connect with Like-minded Readers and
            Writers
          </Text>
          <Link
            as={NextLink}
            href="/pages/signin"
            // w="100%"
            maxW="400px"
            bg="#543EE0"
            color="white"
            _hover={{ bg: "#715fe3" }}
            py="15px"
            px="45px"
            borderRadius="md"
          >
            Get Started
          </Link>
        </Box>
      </Center>
    </Center>
  );
};

export default Hero;
