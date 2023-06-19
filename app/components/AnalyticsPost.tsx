"use client";

import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
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
];

const AnalyticsPost = () => {
  return (
    <Box>
      {PostDetail.map((item) => (
        <Box
          borderTop={"3px solid brand.600"}
          //   borderRadius={"lg"}
          key={item.title}
          mb={6}
        >
          <Stack mt={27}>
            <Heading as="h4" size="lg" fontWeight={500} mb={3}>
              Posts highlights
            </Heading>
            <HStack>
              <Heading as="h4" fontWeight={600} fontSize="24px">
                Top posts,{" "}
                <Text
                  fontWeight={300}
                  fontSize={"16px"}
                  display={"inline-block"}
                >
                  earned 2980 impressions
                </Text>
              </Heading>
            </HStack>
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

            <Flex>
              <HStack gap={"20%"}>
                {item.footer?.map((footerItem, i) => (
                  <HStack key={i}>
                    <Icon as={footerItem.icon} mr={1} />
                    <HStack>
                      <Text>{footerItem.count}</Text>
                      {i === 2 && <Text>views</Text>}
                    </HStack>
                  </HStack>
                ))}
              </HStack>
            </Flex>
            <Box my={2}>
              <Button
                bg={"brand.600"}
                color={"white"}
                _hover={{
                  bg: "brand.700",
                }}
              >
                View post activity
              </Button>
            </Box>
          </Stack>
        </Box>
      ))}
    </Box>
  );
};

export default AnalyticsPost;
