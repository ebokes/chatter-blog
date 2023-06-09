"use client";

import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  Link,
  Spacer,
  Stack,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { VscBook } from "react-icons/vsc";
import { IoChatbubblesOutline } from "react-icons/io5";
import { SlLike } from "react-icons/sl";
import { MdInsertChartOutlined } from "react-icons/md";
import { IconType } from "react-icons";
import { start } from "repl";

interface PostHighlightsProps {
  title: string;
  count: string;
}
interface PostDetailProps {
  avatar: string;
  name: string;
  role: string;
  date: string;
  title: string;
  readTime: string;
  intro: string;
  image: string;
  alt: string;
  footer?: {
    icon: IconType;
    count?: number;
  }[];
}

const PostDetail: Array<PostDetailProps> = [
  {
    avatar: "/avatar1.svg",
    name: "Grace Ikpang",
    role: "Product designer",
    date: "May 25th, 2023",
    title: "Starting out as a Product designer",
    readTime: "10 mins read",
    intro:
      "Embarking on a journey as a product designer can be an exhilarating and fulfilling experience. As a profession that bridges the realms of art, technology, and problem-solving, product design offers an opportunity to shape the way people interact with the world around them.",
    image: "/img.jpeg",
    alt: "img",
    footer: [
      {
        icon: IoChatbubblesOutline,
        count: 200,
      },
      {
        icon: SlLike,
        count: 20,
      },
      {
        icon: MdInsertChartOutlined,
        count: 1280,
      },
    ],
  },
];

const PostHighlights: PostHighlightsProps[] = [
  {
    title: "Post",
    count: "3",
  },
  {
    title: "Posts Impressions",
    count: "2.98k",
  },
  {
    title: "Profile visits",
    count: "300",
  },
  {
    title: "New followers",
    count: "299",
  },
];

const PostSummary = () => {
  return (
    <Box>
      <Heading as="h4" size="lg" fontWeight={500} mb={3}>
        Posts Summary
      </Heading>
      <HStack>
        <Text fontWeight={300} fontSize={"16px"} display={"inline-block"}>
          May 2023 summary
        </Text>
      </HStack>
      {PostDetail.map((item) => (
        <Box
          borderTop={"3px solid #543EE0"}
          //   borderRadius={"lg"}
          key={item.title}
          my={6}
        >
          <Stack mt={27}>
            <Heading as="h4" size="md" fontWeight={600} mb={3}>
              Posts Highlights
            </Heading>
          </Stack>
          <Grid
            h="200px"
            templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }}
            templateRows={{ base: "repeat(4, 1fr)", sm: "repeat(2, 1fr)" }}
            gap={8}
            maxW="lg"
          >
            {PostHighlights.map((item) => (
              <GridItem
                key={item.title}
                placeSelf={{ base: "center", sm: "start" }}
              >
                <Center>
                  <Center flexDir={"column"}>
                    <Heading
                      as="h4"
                      size="md"
                      fontWeight={600}
                      mb={3}
                      color={"#626262"}
                    >
                      {item.title}
                    </Heading>
                    <Text>{item.count}</Text>
                  </Center>
                </Center>
              </GridItem>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default PostSummary;
