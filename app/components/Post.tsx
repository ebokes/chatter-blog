"use client";

import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Link,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { VscBook } from "react-icons/vsc";
import { IoChatbubblesOutline } from "react-icons/io5";
import { SlLike } from "react-icons/sl";
import { MdInsertChartOutlined } from "react-icons/md";
import { IconType } from "react-icons";

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

const Post = () => {
  return (
    <Box>
      {PostDetail.map((item) => (
        <Box
          border={"1px solid #d0d0d0"}
          borderRadius={"lg"}
          key={item.title}
          mb={6}
        >
          <Stack mt={27} mx={"44px"}>
            <HStack>
              <Avatar size="2xl" name={item.name} src={item.avatar} />
              <Box>
                <Heading fontSize={"24px"} fontWeight={500} mb={4}>
                  {item.name}
                </Heading>
                <HStack flexWrap={"wrap"}>
                  <Text>{item.role}</Text>
                  <Spacer />
                  <Text>{item.date}</Text>
                </HStack>
              </Box>
            </HStack>
            <Heading fontWeight={500} fontSize={"32px"} mt={"15px"}>
              {item.title}
            </Heading>
            <HStack>
              <Icon as={VscBook} /> <Text>{item.readTime}</Text>
            </HStack>
            <Text fontSize={"18px"} mt={"24px"}>
              {item.intro}
            </Text>
            <Image src={item.image} width={612} height={242} alt="img" />
            <Flex>
              <HStack gap={"20%"}>
                {item.footer?.map((footerItem, i) => (
                  <Link as={Button} key={i}>
                    <Icon as={footerItem.icon} mr={1} />
                    <Text>{footerItem.count}</Text>
                  </Link>
                ))}
              </HStack>
            </Flex>
          </Stack>
        </Box>
      ))}
    </Box>
  );
};

export default Post;
