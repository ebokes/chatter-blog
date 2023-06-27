"use client";

import Comments from "@/app/components/Comments";
import { ChatterContext } from "@/app/context/ChatterContext";
import { auth } from "@/app/lib/firebase";
import Loading from "@/app/loader/Loading";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import MarkdownIt from "markdown-it";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { IconType } from "react-icons";
import { BsBookmarkCheckFill, BsBookmarkPlus } from "react-icons/bs";
import { VscBook } from "react-icons/vsc";

interface MarkdownProps {
  children: string;
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
  // bookmarked: boolean;
  tags: string[];
  footer?: {
    icon: IconType;
    count?: number;
  }[];
}

// interface MarkdownRendererProps {
//   markdownText: string;
// }

const Preview = () => {
  const { colorMode } = useColorMode();
  const { entry } = useContext(ChatterContext);
  // const { isOpen: previewIsOpen, onClose: previewOnClose } = useDisclosure();

  function renderMarkdownToHtml(markdownText: string): React.ReactNode {
    const md = new MarkdownIt();
    const html = md.render(markdownText);
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return (
    <>
      <Box
        borderRadius={"lg"}
        mb={6}
        color={colorMode === "light" ? "brand.800" : "brand.400"}
      >
        <Stack mt={27} mx={{ base: "0px", lg: "44px" }}>
          <Box>
            <Flex justify={"space-between"} w={"full"}>
              <Flex gap={2} mb={"15px"}>
                {/* <Avatar size="md" name={post?.data?.author} /> */}
                <Box>
                  {/* <Heading fontSize={"20px"} fontWeight={600} mb={1}>
                    {post?.data?.author}
                  </Heading> */}
                  <HStack flexWrap={"wrap"}>
                    {/* <Text>{post?.data?.role}</Text> */}
                    <Box
                      boxSize={"4px"}
                      bg={colorMode === "light" ? "brand.800" : "brand.400"}
                      borderRadius={"full"}
                    />
                    <Text>{entry.postedOn}</Text>
                    <Box
                      boxSize={"4px"}
                      bg={colorMode === "light" ? "brand.800" : "brand.400"}
                      borderRadius={"full"}
                    />
                    <HStack>
                      <Icon as={VscBook} />{" "}
                      <Text>{entry.postLength} mins read</Text>
                    </HStack>
                  </HStack>
                </Box>
              </Flex>
            </Flex>
            <Flex flex={0.7}>
              <Image
                src={entry.bannerImg}
                width={412}
                height={142}
                alt="img"
                style={{
                  width: "612px",
                  objectFit: "cover",
                  height: "242px",
                  objectPosition: "center",
                }}
              />
            </Flex>
            <Box>
              <Stack flex={1}>
                <Heading fontWeight={700} fontSize={"34px"} my={"30px"}>
                  {entry.title}
                </Heading>

                <Box>{renderMarkdownToHtml(entry.body)}</Box>
              </Stack>
            </Box>
          </Box>
          <HStack>
            {/* <HStack>
            {post?.data?.tags.map((tag, i) => (
              <Button
                variant={"outline"}
                px={"8px"}
                h={"32px"}
                fontSize={"14px"}
                key={i}
              >
                {tag}
                // {i > 1 && `+${post?.data?.tags.length - 2}`}
              </Button>
            ))}
          </HStack> */}
          </HStack>
          {/* <Flex justify={"flex-end"}>
          <HStack gap={"20%"}>
            {post?.data?.footer?.map((footerpost?.data?, i) => (
              <Button key={i} variant={"ghost"}>
                <Icon as={footerpost?.data?.icon} mr={1} />
                <Text>{footerpost?.data?.count}</Text>
              </Button>
            ))}
          </HStack>
        </Flex> */}
        </Stack>
      </Box>
      {/* ))} */}
    </>
  );
};

export default Preview;
