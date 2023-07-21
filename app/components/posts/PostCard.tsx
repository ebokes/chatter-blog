"use client";

import {
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import { VscBook } from "react-icons/vsc";
import PostActions from "./PostActions";
import PostHeader from "./PostHeader";
import Link from "next/link";

const PostCard = ({ post, link }: any) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      border={"1px solid"}
      borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
      borderRadius={"5px"}
      mb={6}
      color={colorMode === "light" ? "brand.800" : "brand.400"}
      pb={"20px"}
      bg={colorMode === "light" ? "brand.200" : "brand.800"}
    >
      <Stack mt={27} mx={{ base: "24px", lg: "44px" }}>
        <PostHeader post={post} />
        <Box
          w={"full"}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Link href={`/pages/${link}/${post.id}`}>
            <Flex flexDir={{ base: "column-reverse", lg: "row" }} gap={4}>
              <Stack flex={1} mr={{ base: "0", lg: "22px" }}>
                <Heading
                  fontWeight={500}
                  fontSize={{ base: "20px", md: "24px" }}
                  mt={"10px"}
                >
                  {post?.title}
                </Heading>
                <HStack>
                  <Icon as={VscBook} />{" "}
                  <Text>{post?.postLength} mins read</Text>
                </HStack>
                <Text fontSize={"18px"} mt={"10px"}>
                  {post?.intro}
                </Text>
              </Stack>
              <Flex flex={0.7}>
                {post?.bannerImg && (
                  <Image
                    src={post?.bannerImg}
                    width={312}
                    height={242}
                    alt="banner image"
                    priority={false}
                    quality={20}
                    style={{
                      objectFit: "contain",
                    }}
                  />
                )}
              </Flex>
            </Flex>
          </Link>
        </Box>
        <PostActions post={post} link={link} />
      </Stack>
    </Box>
  );
};

export default PostCard;
