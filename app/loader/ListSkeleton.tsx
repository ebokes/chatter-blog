"use client";

import { Stack, Skeleton } from "@chakra-ui/react";
import React from "react";

const ListSkeleton = () => {
  return (
    <Stack spacing={3}>
      <Skeleton height="15px" w={"100px"} />
      <Skeleton height="15px" w={"100px"} />
      <Skeleton height="15px" w={"100px"} />
      <Skeleton height="15px" w={"100px"} />
      <Skeleton height="15px" w={"100px"} />
    </Stack>
  );
};

export default ListSkeleton;
