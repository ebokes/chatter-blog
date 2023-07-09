"use client";

import AnalyticsPost from "@/app/components/AnalyticsPost";
import PostSummary from "@/app/components/PostSummary";
import { Divider, Flex, HStack, Heading, Stack, Text } from "@chakra-ui/react";

interface AnalyticsProps {}

const Analytics = (props: AnalyticsProps) => {
  return (
    <>
      <Flex align={"flex-end"} justify={"space-between"} my={5}>
        <Stack>
          <Heading fontWeight={500} fontSize={28} marginBottom={23}>
            Posts analytics
          </Heading>
          <HStack>
            <Heading as="h4" fontWeight={600} fontSize="24px">
              May 2023,{" "}
              <Text fontWeight={300} fontSize={"16px"} display={"inline-block"}>
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
    </>
  );
};

export default Analytics;
