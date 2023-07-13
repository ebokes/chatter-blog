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
      px={{ base: 2, sm: 5 }}
      border={{ base: "0px solid", sm: "1px solid" }}
      // borderColor={colorMode === "light" ? "brand.400" : "brand.600"}

      bg={colorMode === "light" ? "brand.100" : "brand.480"}
    >
      <Box maxW={"854px"} mx={"auto"}>
        {children}
      </Box>
    </Box>
  );
}
