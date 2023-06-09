"use client";

import {
  Button,
  Center,
  Flex,
  FormControl,
  HStack,
  Heading,
  Icon,
  Input,
  Link,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import NextLink from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import PasswordInput from "@/app/components/PasswordInput";
// import TabLink from "@/app/components/TabLink";

interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  joiningAs: string;
  password: string;
  confirmPassword: string;
}

export default function Signupp() {
  const [active, setActive] = useState(false);
  const [signUpForm, setSignUpForm] = useState<SignUpForm>({
    firstName: "",
    lastName: "",
    email: "",
    joiningAs: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <Stack mx="auto">
      <HStack align={"stretch"}>
        <Center mx="auto" flex={1}>
          <Stack alignSelf={"flex-start"} maxW={"520px"} w={"full"} py={"35px"}>
            <Heading textAlign="center" mb="26px" mt={"30px"}>
              Register as a Writer/Reader
            </Heading>
            <form>
              <Flex flexDir="column" gap={6}>
                <HStack gap={6} flexDir={{ base: "column", sm: "row" }}>
                  <FormControl>
                    <label>First Name</label>
                    <Input
                      required
                      name="firstName"
                      // onChange={handleChange}
                      type="text"
                      placeholder="Enter First name"
                    />
                  </FormControl>
                  <FormControl>
                    <label>Last Name</label>
                    <Input
                      type="text"
                      placeholder="Enter Last name"
                      required
                      name="lastName"
                      // onChange={handleChange}
                    />
                  </FormControl>
                </HStack>

                <FormControl>
                  <label>You are joining as?</label>
                  <Select required name="joiningAs" defaultValue={"writer"}>
                    <option value="writer">Writer</option>
                    <option value="reader">Reader</option>
                  </Select>
                </FormControl>
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
                  Create account
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
                      <Text>Sign up with google</Text>
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
                      <Text> Sign up with Linkedin</Text>
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
