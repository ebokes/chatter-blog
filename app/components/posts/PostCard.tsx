"use client";

import {
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  Link,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import { VscBook } from "react-icons/vsc";
import PostActions from "./PostActions";
import PostHeader from "./PostHeader";
// import PostCardSkeleton from "@/app/loader/PostCard";

const PostCard = ({ post, link = "dashboard" }: any) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      border={"1px solid "}
      borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
      borderRadius={"lg"}
      mb={6}
      color={colorMode === "light" ? "brand.800" : "brand.400"}
      pb={"20px"}
    >
      <Stack mt={27} mx={{ base: "24px", lg: "44px" }}>
        <PostHeader post={post} />
        <Box>
          <Link
            href={`/pages/${link}/${post.id}`}
            _hover={{
              textDecoration: "none",
            }}
            w={"full"}
          >
            <Flex flexDir={{ base: "column-reverse", lg: "row" }}>
              <Stack flex={1} mr={{ base: "0", lg: "22px" }}>
                <Heading fontWeight={500} fontSize={"24px"} mt={"10px"}>
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
                <Image
                  src={post?.bannerImg}
                  width={312}
                  height={242}
                  alt="banner image"
                  priority={false}
                  quality={20}
                  style={{
                    borderRadius: "10px",
                    objectFit: "cover",
                    height: "200px",
                  }}
                />
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
