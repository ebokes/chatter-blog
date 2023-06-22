"use client";

import Feed from "@/app/components/Feed";
import Navbar from "@/app/components/Navbar";
import Recommendation from "@/app/components/Recommendation";
import { Box, Center, Flex } from "@chakra-ui/react";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <Box maxW={"1200px"} mx={"auto"}>
        <Flex
          px={"20px"}
          justify={"space-between"}
          w={"full"}
          gap={6}
          overflowY={"scroll"}
          h={"100vh"}
        >
          <Box>
            <Feed />
          </Box>
          <Recommendation />
        </Flex>
      </Box>
    </>
  );
};

export default page;
