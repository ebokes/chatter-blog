"use client";

import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";

export default function Cta() {
  const { colorMode } = useColorMode();
  return (
    <Box bg={colorMode === "light" ? "light" : "brand.800"}>
      <Stack
        minH={"492px"}
        direction={{ base: "column", md: "row" }}
        align={"center"}
        maxW={"1000px"}
        mx={"auto"}
        px={"32px"}
        py={{ base: "55px", md: "72px" }}
        gap={77}
        color={colorMode === "light" ? "brand.800" : "gray.400"}
      >
        <Flex>
          <HStack>
            <VStack gap={16}>
              <Image
                alt="Login Image"
                src="/alex.webp"
                width={154}
                height={154}
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
              <Image
                alt="Login Image"
                src="/alex.webp"
                width={154}
                height={154}
                style={{ borderRadius: "50%" }}
              />
            </VStack>
            <VStack>
              <Image
                alt="Login Image"
                src="/alex.webp"
                width={154}
                height={154}
                style={{ borderRadius: "50%" }}
              />
            </VStack>
          </HStack>
        </Flex>
        <Flex py={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={6} w={"full"}>
            <Heading color={colorMode === "light" ? "brand.850" : "brand.300"}>
              Write, read and connect with great minds on chatter
            </Heading>

            <Text color={colorMode === "light" ? "brand.900" : "brand.350"}>
              Share people your great ideas, and also read write-ups based on
              your interests. connect with people of same interests and goals{" "}
            </Text>

            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Button
                as={NextLink}
                href={"/pages/signup"}
                rounded={"md"}
                bg={"brand.600"}
                color={"white"}
                _hover={{
                  bg: "brand.700",
                }}
                w={"150px"}
              >
                Get started
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </Box>
  );
}
