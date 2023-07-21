"use client";

import { Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react";

const NavMenuSkeleton = () => {
  return (
    <Flex align={"center"} justify={"space-between"}>
      <Skeleton mr={6} h={"34px"} w={"81px"} borderRadius={"2xl"} />
      <SkeletonCircle size={"30px"} mr={4} />
      <SkeletonCircle size={"30px"} mr={4} />
      <SkeletonCircle size={"30px"} mr={1} />
      <Skeleton h={"8px"} w={"10px"} />
    </Flex>
  );
};

export default NavMenuSkeleton;
