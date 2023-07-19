"use client";

import { Box, Flex, Heading, Text, useColorMode } from "@chakra-ui/react";

interface AnalyticsProps {}

const AnalyticsPage = (props: AnalyticsProps) => {
  const { colorMode } = useColorMode();
  return (
    <Box p={8}>
      <Flex align="center" justify="space-between" mb={8}>
        <Box>
          <Heading fontWeight={500} fontSize={{ base: "xl", md: "2xl" }}>
            Analytics
          </Heading>
          <Text fontSize={{ base: "sm", md: "md" }}>
            Track and analyze your blog&apos;s performance
          </Text>
        </Box>
      </Flex>
      <Box bg={colorMode === "light" ? "white" : "gray.700"} rounded="lg" p={4}>
        {/* Include additional content for analytics, such as charts, graphs, and data tables */}
        {/* <AnalyticsChart /> */}
        <Text>Coming soon...</Text>
      </Box>
    </Box>
    // <>
    //   <Flex align={"flex-end"} justify={"space-between"} my={5}>
    //     <Stack>
    //       <Heading fontWeight={500} fontSize={28} marginBottom={23}>
    //         Posts analytics
    //       </Heading>
    //       <HStack>
    //         <Heading as="h4" fontWeight={600} fontSize="24px">
    //           May 2023,{" "}
    //           <Text fontWeight={300} fontSize={"16px"} display={"inline-block"}>
    //             25days so far
    //           </Text>
    //         </Heading>
    //       </HStack>
    //       <Divider color={"red"} orientation="vertical" size={"full"} />
    //     </Stack>
    //   </Flex>
    //   <AnalyticsPost />
    //   <PostSummary />
    // </>
  );
};

export default AnalyticsPage;
