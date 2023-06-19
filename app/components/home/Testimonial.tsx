"use client";

import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";

export default function Testimonial() {
  const { colorMode } = useColorMode();
  return (
    <Box px={"32px"} bg={colorMode === "light" ? "brand.500" : "dark"}>
      <Stack
        minH={"492px"}
        direction={{ base: "column", md: "row" }}
        align={"center"}
        maxW={"1200px"}
        mx={"auto"}
        py={{ base: "55px", md: "72px" }}
        gap={77}
      >
        <Flex>
          <Image
            alt="Login Image"
            src="/alex.webp"
            width={300}
            height={300}
            style={{ borderRadius: "50%" }}
          />
        </Flex>
        <Flex py={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={6} w={"full"}>
            <Text
              fontSize={{ base: "md", lg: "lg" }}
              color={colorMode === "light" ? "brand.900" : "brand.350"}
            >
              `Chatter has become an integral part of my online experience. As a
              user of this incredible blogging platform, I have discovered a
              vibrant community of individuals who are passionate about sharing
              their ideas and engaging in thoughtful discussions.`
            </Text>
            <HStack>
              <Heading
                as="h4"
                fontWeight={600}
                fontSize="24px"
                color={colorMode === "light" ? "brand.850" : "brand.300"}
              >
                Adebobola Muhydeen,{" "}
                <Text
                  fontWeight={300}
                  fontSize={"16px"}
                  display={"inline-block"}
                  color={colorMode === "light" ? "brand.900" : "brand.350"}
                >
                  Software developer at Apple
                </Text>
              </Heading>
            </HStack>
            <Stack direction={{ base: "column", md: "row" }}>
              <Button
                as={NextLink}
                href={"/pages/signup"}
                rounded={"md"}
                bg={"brand.600"}
                color={"brand.100"}
                _hover={{
                  bg: "brand.700",
                }}
                w={"150px"}
              >
                Join chatter
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </Box>
  );
}
