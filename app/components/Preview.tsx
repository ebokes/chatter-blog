"use client";

import { ChatterContext } from "@/app/context/ChatterContext";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import { useContext } from "react";
import { VscBook } from "react-icons/vsc";
import { useAuth } from "../hooks/auth";
import { formatPostedOn } from "../utils/funcns";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { useAddSavePost } from "../hooks/post";

const Preview = () => {
  const { colorMode } = useColorMode();
  const { entry } = useContext(ChatterContext);
  const { user } = useAuth();
  const { fileURL } = useAddSavePost();

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
                <Avatar size="md" name={user?.displayName} src={user?.avatar} />
                <Box>
                  <Heading fontSize={"20px"} fontWeight={600} mb={1}>
                    {user?.displayName}
                  </Heading>
                  <HStack flexWrap={"wrap"}>
                    {user?.username ? (
                      <Text>@{user?.username}</Text>
                    ) : (
                      <Text>@{user?.email?.split("@")[0]}</Text>
                    )}
                    <Box
                      boxSize={"4px"}
                      bg={colorMode === "light" ? "brand.800" : "brand.400"}
                      borderRadius={"full"}
                    />
                    <Text>{formatPostedOn(entry?.postedOn)}</Text>
                    <Box
                      boxSize={"4px"}
                      bg={colorMode === "light" ? "brand.800" : "brand.400"}
                      borderRadius={"full"}
                    />
                    <HStack>
                      <Icon as={VscBook} />{" "}
                      <Text>{entry.postLength} mins read</Text>
                    </HStack>
                    <Box
                      boxSize={"4px"}
                      bg={colorMode === "light" ? "brand.800" : "brand.400"}
                      borderRadius={"full"}
                    />
                    <HStack>
                      <Button borderRadius={"2xl"}>{entry.category}</Button>
                    </HStack>
                  </HStack>
                </Box>
              </Flex>
            </Flex>
            <Flex flex={0.7}>
              {/* {entry.bannerImg && (
                <Image
                  src={entry.bannerImg}
                  width={412}
                  height={142}
                  alt="img"
                  style={{
                    width: "612px",
                    objectFit: "cover",
                    height: "342px",
                    objectPosition: "center",
                  }}
                />
              )} */}
              {fileURL && (
                <Image
                  src={fileURL}
                  width={412}
                  height={142}
                  alt="img"
                  style={{
                    width: "612px",
                    objectFit: "cover",
                    height: "342px",
                    objectPosition: "center",
                  }}
                />
              )}
            </Flex>
            <Box>
              <Stack flex={1}>
                <Heading fontWeight={700} fontSize={"34px"} my={"30px"}>
                  {entry.title}
                </Heading>
                <MarkdownRenderer markdownContent={entry?.body ?? ""} />
                {/* <ReactMarkdown>{entry?.body}</ReactMarkdown> */}
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Preview;
