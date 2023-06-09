"use client";

import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  HStack,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Signupp from "@/app/components/Signupp";
import Signinn from "@/app/components/Signinn";

export default function Auth() {
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
                  <Box>REGISTER</Box>
                </Tab>
                <Tab flex={1} justifySelf={"flex-end"}>
                  <Box>LOGIN</Box>
                </Tab>
              </TabList>
              <TabIndicator mt="-1.5px" height="6px" bg="#543EE0" />
              <TabPanels>
                <TabPanel>
                  <Signupp />
                </TabPanel>
                <TabPanel>
                  <Signinn />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </Center>
      </HStack>
    </Stack>
  );
}
