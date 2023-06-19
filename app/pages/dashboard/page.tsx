"use client";

import Feed from "@/app/components/Feed";
import { Box, useColorMode } from "@chakra-ui/react";
import React from "react";

const Dashboard = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={colorMode === "light" ? "#F9FAFB" : "#171923"}
      color={colorMode === "light" ? "#171923" : "#F9FAFB"}
    >
      <Feed />
    </Box>
  );
};

export default Dashboard;
