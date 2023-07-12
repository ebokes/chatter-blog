"use client";

import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";

const MotionBox = motion(Box);

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
        px={{ base: "15px", md: "32px" }}
        mx={"auto"}
      >
        <MotionBox
          maxW="850px"
          color={colorMode === "light" ? "brand.100" : "gray.200"}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Heading
            fontSize={{ base: "38px", md: "48px" }}
            textAlign={{ base: "center", md: "left" }}
          >
            Welcome to Chatter : A Haven for Text-Based Content
          </Heading>
          <Text
            mb="36px"
            mt="24px"
            fontSize="24px"
            textAlign={{ base: "center", md: "left" }}
          >
            Unleash the Power of Words, Connect with Like-minded Readers and
            Writers
          </Text>
          <Flex justify={{ base: "center", md: "flex-start" }} w={"full"}>
            <Flex gap={5} flexDir={{ base: "column", sm: "row" }}>
              <MotionBox
                as={Center}
                maxW="400px"
                w={"150px"}
                bg="brand.600"
                color="white"
                _hover={{ bg: "brand.700" }}
                py="10px"
                px="25px"
                borderRadius="md"
                fontWeight={600}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <Link href="/pages/signin">Get Started</Link>
              </MotionBox>
              <MotionBox
                as={Center}
                maxW="400px"
                w={"150px"}
                bg="brand.600"
                color="white"
                _hover={{ bg: "brand.700" }}
                py="10px"
                px="35px"
                borderRadius="md"
                fontWeight={600}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <Link href="/pages/feed">Feed</Link>
              </MotionBox>
            </Flex>
          </Flex>
        </MotionBox>
      </Center>
    </Center>
  );
};

export default Hero;
