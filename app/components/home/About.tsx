"use client";

import { auth } from "@/app/lib/firebase";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const About = () => {
  const { colorMode } = useColorMode();
  const [user, loading, error] = useAuthState(auth);
  console.log(user);
  return (
    <Box
      bg={colorMode === "light" ? "brand.300" : "brand.800"}
      color={colorMode === "light" ? "brand.800" : "brand.350"}
    >
      <Stack
        direction={{ base: "column-reverse", md: "row" }}
        align={"center"}
        maxW={"1200px"}
        mx={"auto"}
        px={"32px"}
        py={{ base: "55px", md: "72px" }}
      >
        <Flex py={8} flex={1} align={"center"} justify={"center"} mr={"12px"}>
          <Stack spacing={6}>
            <Heading color={colorMode === "light" ? "brand.850" : "brand.300"}>
              About Chatter
            </Heading>

            <Text
              minW={{ base: "", md: "369px" }}
              color={colorMode === "light" ? "brand.900" : "brand.350"}
            >
              Chatter is a multi-functional platform where authors and readers
              can have access to their own content. It aims to be a traditional
              bookworm’s heaven and a blog to get access to more text based
              content. Our vision is to foster an inclusive and vibrant
              community where diversity is celebrated. We encourage
              open-mindedness and respect for all individuals, regardless of
              their backgrounds or beliefs. By promoting dialogue and
              understanding, we strive
            </Text>
          </Stack>
        </Flex>
        <Flex>
          <Image
            alt="About Image"
            src="/abt.jpg"
            width={500}
            height={404}
            // style={{ objectFit: "cover" }}
          />
        </Flex>
      </Stack>
    </Box>
  );
};

export default About;
