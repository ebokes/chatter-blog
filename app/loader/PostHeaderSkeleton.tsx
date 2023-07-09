"use client";

import { Flex, HStack, Skeleton, SkeletonCircle } from "@chakra-ui/react";

const PostHeaderLoader = () => {
  return (
    <HStack w="full">
      <SkeletonCircle size="50px" minW={"50px"} />
      <Flex gap={3} justify={"flex-start"} flexDir={"column"}>
        <Skeleton height={"20px"} w={"200px"} />
        <Flex gap={"2px"} flexDir={{ base: "column", sm: "row" }}>
          <Skeleton h={"12px"} w={"90px"} />
          <Skeleton h={"12px"} w={"70px"} />
        </Flex>
      </Flex>
    </HStack>
  );
};

export default PostHeaderLoader;
