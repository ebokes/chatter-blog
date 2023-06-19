"use client";

import { Box, useColorMode } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface FeedProps {
  children: ReactNode;
}

export default function DashboardWrapper({ children }: FeedProps) {
  const { colorMode } = useColorMode();
  return (
    <Box
      px={5}
      border="1px solid"
      borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
    >
      <Box maxW={"854px"} mx={"auto"}>
        {children}
      </Box>
    </Box>
  );
}
