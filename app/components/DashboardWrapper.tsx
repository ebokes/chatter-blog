"use client";

import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface FeedProps {
  children: ReactNode;
}

export default function DashboardWrapper({ children }: FeedProps) {
  return (
    <Box px={{ base: 2, sm: 5 }}>
      <Box maxW={"854px"} mx={"auto"}>
        {children}
      </Box>
    </Box>
  );
}
