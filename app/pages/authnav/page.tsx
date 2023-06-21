"use client";

import OAuthButtons from "@/app/components/OAuthButtons";
import Signin from "@/app/components/Signin";
import Signup from "@/app/components/Signup";
import {
  Box,
  Center,
  HStack,
  Heading,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";

export default function AuthNav() {
  const { colorMode } = useColorMode();
  return (
    <Stack mx="auto">
      <HStack align={"stretch"}>
        <Stack
          flex={0.9}
          textAlign="center"
          backgroundImage="/writer.webp"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          h="100vh"
          display={{ base: "none", md: "flex" }}
        >
          <Center
            bgGradient="linear(to-l, #0000007f, #0000007f)"
            h="100%"
            color="white"
            flexDir="column"
          >
            <Heading>CHATTER</Heading>
            <Text>
              Unleash the Power of Words, Connect with Like-minded Readers and
              Writers
            </Text>
          </Center>
        </Stack>
        <Center mx="auto" flex={1}>
          <Stack alignSelf={"flex-start"} maxW={"520px"} w={"full"} py={"35px"}>
            <Tabs position="relative" variant="unstyled" defaultIndex={1}>
              <TabList
                display={"flex"}
                justifyContent={"space-between"}
                mx={"20px"}
              >
                <Tab flex={1}>
                  <Box>
                    <Heading
                      color={colorMode === "light" ? "brand.850" : "brand.300"}
                      fontSize={"18px"}
                    >
                      REGISTER
                    </Heading>
                  </Box>
                </Tab>
                <Tab flex={1} justifySelf={"flex-end"}>
                  <Box>
                    <Heading
                      fontSize={"18px"}
                      color={colorMode === "light" ? "brand.850" : "brand.300"}
                    >
                      LOG IN
                    </Heading>
                  </Box>
                </Tab>
              </TabList>
              <TabIndicator mt="-1.5px" height="4px" bg="#543EE0" />
              <TabPanels>
                <TabPanel>
                  <Signup />
                  <OAuthButtons />
                </TabPanel>
                <TabPanel>
                  <Signin />
                  <OAuthButtons />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </Center>
      </HStack>
    </Stack>
  );
}
