"use client";

import Feed from "@/app/components/Feed";
import { Box, useColorMode } from "@chakra-ui/react";
import React from "react";

const Dashboard = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={colorMode === "light" ? "brand.300" : "brand.800"}
      color={colorMode === "light" ? "brand.850" : "brand.300"}
      // borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
    >
      <Feed />
    </Box>
  );
};

export default Dashboard;
