"use client";

import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";

export default function Testimonial() {
  const { colorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const imageWidth = isMobile ? "200px" : "300px";
  const imageHeight = isMobile ? "200px" : "300px";
  return (
    <Box px={"32px"} bg={colorMode === "light" ? "brand.500" : "dark"}>
      <Stack
        minH={"492px"}
        direction={{ base: "column", md: "row" }}
        align={"center"}
        maxW={"1200px"}
        mx={"auto"}
        py={{ base: "55px", md: "72px" }}
        columnGap={77}
        rowGap={12}
      >
        <Flex>
          <Image
            alt="Login Image"
            src="/images/stylish-black-girl.webp "
            width={300}
            height={300}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "center",
              width: imageWidth,
              height: imageHeight,
            }}
          />
        </Flex>
        <Flex
          flex={1}
          align={"center"}
          justify={"center"}
          flexDir={{ base: "column", md: "row" }}
        >
          <Stack
            spacing={6}
            w={"full"}
            textAlign={{ base: "center", md: "left" }}
          >
            <Text
              fontSize={{ base: "md", lg: "lg" }}
              color={colorMode === "light" ? "brand.900" : "brand.350"}
            >
              `Chatter has become an integral part of my online experience. As a
              user of this incredible blogging platform, I have discovered a
              vibrant community of individuals who are passionate about sharing
              their ideas and engaging in thoughtful discussions.`
            </Text>
            <Flex align={"center"} flexDir={{ base: "column", md: "row" }}>
              <Heading
                as="h4"
                fontWeight={600}
                fontSize="24px"
                color={colorMode === "light" ? "brand.850" : "brand.300"}
              >
                Joan Johnson,&nbsp;
              </Heading>
              <Text
                fontWeight={300}
                fontSize={"16px"}
                display={"inline-block"}
                color={colorMode === "light" ? "brand.900" : "brand.350"}
              >
                Software developer at Apple
              </Text>
            </Flex>
            <Box>
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
            </Box>
          </Stack>
        </Flex>
      </Stack>
    </Box>
  );
}
