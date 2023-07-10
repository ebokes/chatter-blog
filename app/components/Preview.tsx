"use client";

import { ChatterContext } from "@/app/context/ChatterContext";
import {
  Avatar,
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
import { useContext } from "react";
import { VscBook } from "react-icons/vsc";
import { useAuth } from "../hooks/auth";
import { formatDate } from "../utils/funcns";
import ReactMarkdown from "react-markdown";

const Preview = () => {
  const { colorMode } = useColorMode();
  const { entry } = useContext(ChatterContext);
  const { user } = useAuth();

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
                <Avatar size="md" name={user?.displayName} />
                <Box>
                  <Heading fontSize={"20px"} fontWeight={600} mb={1}>
                    {user?.displayName}
                  </Heading>
                  <HStack flexWrap={"wrap"}>
                    <Text>@{user?.email}</Text>
                    <Box
                      boxSize={"4px"}
                      bg={colorMode === "light" ? "brand.800" : "brand.400"}
                      borderRadius={"full"}
                    />
                    <Text>{formatDate(entry.postedOn)}</Text>
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
              {entry.bannerImg && (
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
              )}
            </Flex>
            <Box>
              <Stack flex={1}>
                <Heading fontWeight={700} fontSize={"34px"} my={"30px"}>
                  {entry.title}
                </Heading>
                <ReactMarkdown>{entry?.body}</ReactMarkdown>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Preview;
