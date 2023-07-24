"use client";

import Feed from "@/app/components/Feed";
import { Box, useColorMode } from "@chakra-ui/react";
import React from "react";

const Dashboard = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={colorMode === "light" ? "light" : "dark"}
      color={colorMode === "light" ? "brand.850" : "brand.300"}
    >
      <Feed />
    </Box>
  );
};

export default Dashboard;
