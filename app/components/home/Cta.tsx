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
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";

export default function Cta() {
  return (
    <Stack
      minH={"492px"}
      direction={{ base: "column", md: "row" }}
      align={"center"}
      maxW={"1000px"}
      mx={"auto"}
      px={"32px"}
      py={{ base: "55px", md: "72px" }}
      gap={77}
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
          <Heading>Write, read and connect with great minds on chatter</Heading>

          <Text>
            Share people your great ideas, and also read write-ups based on your
            interests. connect with people of same interests and goals{" "}
          </Text>

          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Button
              as={NextLink}
              href={"/pages/signup"}
              rounded={"md"}
              bg={"#543EE0"}
              color={"white"}
              _hover={{
                bg: "#715fe3",
              }}
              w={"150px"}
            >
              Get started
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}
