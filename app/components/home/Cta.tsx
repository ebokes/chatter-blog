"use client";

import {
  Box,
  Center,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function Cta() {
  const { colorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const imageWidth = isMobile ? "100px" : "150px";
  const imageHeight = isMobile ? "100px" : "150px";
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
        columnGap={77}
        rowGap={12}
        color={colorMode === "light" ? "brand.800" : "gray.400"}
      >
        <Flex>
          <HStack>
            <VStack gap={{ base: 6, md: 16 }}>
              <Image
                alt="Cta Image"
                src="/images/alex.webp"
                width={154}
                height={154}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "center",
                  width: imageWidth,
                  height: imageHeight,
                }}
              />
              <Image
                alt="Cta Image"
                src="/images/businesswoman.webp"
                width={154}
                height={154}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "center",
                  width: imageWidth,
                  height: imageHeight,
                }}
              />
            </VStack>
            <VStack>
              <Image
                alt="Cta Image"
                src="/images/man.webp"
                width={154}
                height={154}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "center",
                  width: imageWidth,
                  height: imageHeight,
                }}
              />
            </VStack>
          </HStack>
        </Flex>
        <Flex flex={1} align={"center"} justify={"center"}>
          <Stack
            spacing={6}
            w={"full"}
            justify={{ base: "center", md: "flex-start" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <Heading
              color={colorMode === "light" ? "brand.850" : "brand.300"}
              fontSize={{ base: "2xl", md: "4xl" }}
              mb={{ base: 0, md: 2 }}
            >
              Write, read and connect with great minds on chatter
            </Heading>

            <Text color={colorMode === "light" ? "brand.900" : "brand.350"}>
              Share people your great ideas, and also read write-ups based on
              your interests. connect with people of same interests and goals{" "}
            </Text>
            <Flex justify={{ base: "center", md: "flex-start" }}>
              <Box
                rounded={"md"}
                bg={"brand.600"}
                color={"white"}
                _hover={{
                  bg: "brand.700",
                }}
                w={"150px"}
                py={2}
                textAlign={"center"}
              >
                <Link href={"/pages/signup"}>Get started</Link>
              </Box>
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </Box>
  );
}
