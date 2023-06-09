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
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import PasswordInput from "./PasswordInput";
// import PasswordInput from "@/app/components/PasswordInput";

export default function Signinn() {
  return (
    <Stack mx="auto">
      <HStack align={"stretch"}>
        <Center mx="auto" flex={1}>
          <Stack alignSelf={"flex-start"} maxW={"520px"} w={"full"} py={"35px"}>
            <Heading textAlign="center" mb="26px" mt={"30px"}>
              Welcome back
            </Heading>
            <form>
              <Flex flexDir="column" gap={6}>
                <FormControl>
                  <label>Email</label>
                  <Input
                    type="text"
                    placeholder="Enter email"
                    required
                    name="email"
                    // onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <label>Password</label>
                  <PasswordInput />
                </FormControl>

                <Button
                  w="100%"
                  bg="#543EE0"
                  color="white"
                  type="submit"
                  _hover={{ bg: "#715fe3" }}
                >
                  Login
                </Button>
                <VStack>
                  <Link
                    as={NextLink}
                    href="#"
                    border="1px solid #D0D0D0"
                    w="full"
                    borderRadius="md"
                    p="5px"
                    textAlign="center"
                  >
                    <Center gap="11px">
                      <Icon as={FcGoogle} boxSize="24px" />
                      <Text>Sign in with google</Text>
                    </Center>
                  </Link>
                  <Link
                    as={NextLink}
                    href="#"
                    border="1px  solid #D0D0D0"
                    w="full"
                    borderRadius="md"
                    p="5px"
                    mt="21px"
                  >
                    <Center gap="11px">
                      <Icon as={FaLinkedin} color="#0077b5" boxSize="24px" />
                      <Text> Sign in with Linkedin</Text>
                    </Center>
                  </Link>
                </VStack>
              </Flex>
            </form>
          </Stack>
        </Center>
      </HStack>
    </Stack>
  );
}
