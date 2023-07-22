"use client";

import { Flex, Skeleton } from "@chakra-ui/react";
import React from "react";

const CategoriesSkeleton = () => {
  return (
    <Flex gap={2} flexWrap={"wrap"}>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Flex>
  );
};

export default CategoriesSkeleton;
