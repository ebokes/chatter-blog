"use client";

import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const About = () => {
  return (
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
          <Heading>About Chatter</Heading>

          <Text minW={{ base: "", md: "369px" }}>
            Chatter is a multi-functional platform where authors and readers can
            have access to their own content. It aims to be a traditional
            bookworm’s heaven and a blog to get access to more text based
            content. Our vision is to foster an inclusive and vibrant community
            where diversity is celebrated. We encourage open-mindedness and
            respect for all individuals, regardless of their backgrounds or
            beliefs. By promoting dialogue and understanding, we strive
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
  );
};

export default About;
