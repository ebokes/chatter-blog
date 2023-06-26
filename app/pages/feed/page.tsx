"use client";

import Navbar from "@/app/components/Navbar";
import Recommendation from "@/app/components/Rightbar";
import { ChatterContext } from "@/app/context/ChatterContext";
import { useAuth } from "@/app/hooks/auth";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import { useContext, useState } from "react";
import { IconType } from "react-icons";
import { BsBookmarkCheckFill, BsBookmarkPlus } from "react-icons/bs";
import { VscBook } from "react-icons/vsc";

interface PostDetailProps {
  avatar: string;
  name: string;
  role: string;
  date: string;
  title: string;
  readTime: string;
  intro: string;
  bannerUrl: string;
  alt: string;
  bookmarked: boolean;
  tags: string[];
  footer?: {
    icon: IconType;
    count?: number;
  }[];
}

const Feed = () => {
  const { posts } = useContext(ChatterContext);
  const { colorMode } = useColorMode();
  // const { user, isLoading } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };
  return (
    <>
      <Recommendation>
        <Box>
          <Flex align={"flex-end"} justify={"space-between"} my={5}></Flex>

          <Box>
            {posts.map((post) => (
              <Box
                key={post.id}
                border={"1px solid "}
                borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
                borderRadius={"lg"}
                mb={6}
                color={colorMode === "light" ? "brand.800" : "brand.400"}
              >
                <Stack mt={27} mx={{ base: "24px", lg: "44px" }}>
                  <Link
                    href={`/pages/feed/${post.id}`}
                    _hover={{
                      textDecoration: "none",
                    }}
                    w={"full"}
                  >
                    <Box>
                      <Flex gap={2} mb={"10px"}>
                        <Avatar
                          size="md"
                          name={"John Doe"}
                          src={post.data.bannerImg}
                        />
                        <Box>
                          <Heading fontSize={"20px"} fontWeight={600} mb={1}>
                            {post.data.author}
                          </Heading>
                          <HStack flexWrap={"wrap"}>
                            <Text>{post.data.role}</Text>
                            <Box
                              boxSize={"4px"}
                              bg={
                                colorMode === "light"
                                  ? "brand.800"
                                  : "brand.400"
                              }
                              borderRadius={"full"}
                            />
                            <Text>
                              {new Date(post.data.postedOn).toLocaleString(
                                "en-US",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </Text>
                            <Box
                              boxSize={"4px"}
                              bg={
                                colorMode === "light"
                                  ? "brand.800"
                                  : "brand.400"
                              }
                              borderRadius={"full"}
                            />
                            <HStack>
                              <Icon as={VscBook} />{" "}
                            </HStack>
                            <Text>{post.data.postLength} mins read</Text>
                          </HStack>
                        </Box>
                      </Flex>
                      <Flex flexDir={{ base: "column-reverse", md: "row" }}>
                        <Stack flex={1} mr={{ base: "0", md: "22px" }}>
                          <Heading
                            fontWeight={500}
                            fontSize={"24px"}
                            mt={"10px"}
                          >
                            {post.data.title}
                          </Heading>

                          <Text fontSize={"18px"} mt={"10px"}>
                            {post.data.body.split(". ")[0]}
                          </Text>
                        </Stack>
                        <Flex flex={0.7}>
                          <Image
                            src={post.data.bannerImg}
                            width={312}
                            height={242}
                            alt="img"
                            priority={false}
                            style={{
                              borderRadius: "10px",
                              objectFit: "cover",
                              height: "170px",
                            }}
                          />
                        </Flex>
                      </Flex>
                    </Box>
                  </Link>
                  <HStack>
                    <Box>
                      <IconButton
                        variant={"ghost"}
                        onClick={handleBookmark}
                        aria-label="Bookmark"
                        icon={
                          isBookmarked ? (
                            <BsBookmarkCheckFill size={"20px"} />
                          ) : (
                            <BsBookmarkPlus size={"20px"} />
                          )
                        }
                      />
                    </Box>
                    <HStack>
                      {post.data.tag?.map((item: string, i: number) => (
                        <Button
                          variant={"outline"}
                          px={"8px"}
                          h={"32px"}
                          fontSize={"14px"}
                          key={i}
                        >
                          {item}
                          {/* {i > 1 && `+${item.tags.length - 2}`} */}
                        </Button>
                      ))}
                    </HStack>
                  </HStack>

                  <Flex justify={"flex-end"}>
                    <HStack gap={"20%"}>
                      {/* {item.footer?.map((footerItem, i) => (
                        <Button key={i} variant={"ghost"}>
                          <Icon as={footerItem.icon} mr={1} />
                          <Text>{footerItem.count}</Text>
                        </Button>
                      ))} */}
                    </HStack>
                  </Flex>
                </Stack>
              </Box>
            ))}
          </Box>
          {/* </Box> */}
        </Box>
      </Recommendation>
    </>
  );
};

export default Feed;
