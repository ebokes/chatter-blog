"use client";

import AnalyticsPost from "@/app/components/AnalyticsPost";
import PostSummary from "@/app/components/PostSummary";
import {
  Box,
  Divider,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface AnalyticsProps {}

const Analytics = (props: AnalyticsProps) => {
  return (
    <Box ml={{ base: "", md: "60px" }} px={5} border="1px solid #d0d0d0">
      <Box maxW={"854px"} mx={"auto"}>
        <Flex align={"flex-end"} justify={"space-between"} my={5}>
          <Stack>
            <Heading fontWeight={500} fontSize={28} marginBottom={23}>
              Posts analytics
            </Heading>
            <HStack>
              <Heading as="h4" fontWeight={600} fontSize="24px">
                May 2023,{" "}
                <Text
                  fontWeight={300}
                  fontSize={"16px"}
                  display={"inline-block"}
                >
                  25days so far
                </Text>
              </Heading>
            </HStack>
            <Divider color={"red"} orientation="vertical" size={"full"} />
          </Stack>
        </Flex>
        <AnalyticsPost />
        <PostSummary />
        {/* <AnalyticsPost /> */}
      </Box>
    </Box>
  );
};

export default Analytics;
