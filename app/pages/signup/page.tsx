"use client";

import OAuthButtons from "@/app/components/OAuthButtons";
import Navbar from "@/app/components/nav/Navbar";
import { useRegister } from "@/app/hooks/auth";
import { auth } from "@/app/lib/firebase";
import {
  emailValidate,
  firstNameValidate,
  lastNameValidate,
  passwordValidate,
} from "@/app/utils/form-validate";
import { getCapitalizedName, removeSpaces } from "@/app/utils/funcns";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { FiEye } from "react-icons/fi";
import { RxEyeClosed } from "react-icons/rx";

interface SignUpForm {
  // username: string;
  firstName: string;
  lastName: string;
  joiningAs: string;
  email: string;
  password: string;
  followMe: string[];
  iFollow: string[];
}

export default function Signup() {
  const { colorMode } = useColorMode();
  useCreateUserWithEmailAndPassword(auth);
  const { register: signup, isLoading } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();

  async function handleRegister(data: SignUpForm) {
    signup({
      followMe: [],
      iFollow: [],
      email: removeSpaces(data.email.toLowerCase()),
      password: data.password,
      firstName: getCapitalizedName(data.firstName),
      lastName: getCapitalizedName(data.lastName),
      joiningAs: data.joiningAs,
      redirectTo: "/pages/dashboard",
    });
  }

  return (
    <>
      <Navbar />
      <Stack mx="auto">
        <HStack align={"stretch"}>
          <Stack
            flex={0.9}
            textAlign="center"
            backgroundImage="/images/writer.webp"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            // h="100vh"
            display={{ base: "none", md: "flex" }}
            mx={"25px"}
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
            <Stack
              alignSelf={"flex-start"}
              maxW={"520px"}
              w={"full"}
              py={"35px"}
            >
              <Stack mx="auto">
                <HStack align={"stretch"}>
                  <Center mx="auto" flex={1}>
                    <Stack
                      alignSelf={"flex-start"}
                      maxW={"520px"}
                      w={"full"}
                      py={"35px"}
                      px={{ base: "15px", md: "25px" }}
                    >
                      <Heading
                        textAlign="center"
                        mb="26px"
                        mt={"30px"}
                        color={
                          colorMode === "light" ? "brand.850" : "brand.300"
                        }
                      >
                        Register as a Writer/Reader
                      </Heading>
                      <form onSubmit={handleSubmit(handleRegister)}>
                        <Flex flexDir="column" gap={6}>
                          <HStack
                            gap={6}
                            flexDir={{ base: "column", sm: "row" }}
                          >
                            <FormControl isInvalid={!!errors.firstName}>
                              <label>First Name</label>
                              <Input
                                type="text"
                                placeholder="Enter First name"
                                border="1px  solid"
                                borderColor={
                                  colorMode === "light"
                                    ? "brand.400"
                                    : "brand.450"
                                }
                                {...register("firstName", firstNameValidate)}
                              />

                              <FormErrorMessage>
                                {errors.firstName && errors.firstName.message}
                              </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors?.lastName}>
                              <label>Last Name</label>
                              <Input
                                type="text"
                                placeholder="Enter Last name"
                                border="1px  solid"
                                borderColor={
                                  colorMode === "light"
                                    ? "brand.400"
                                    : "brand.450"
                                }
                                {...register("lastName", lastNameValidate)}
                              />

                              <FormErrorMessage>
                                {errors.lastName && errors.lastName.message}
                              </FormErrorMessage>
                            </FormControl>
                          </HStack>
                          <FormControl>
                            <label>You are joining as?</label>
                            <Select
                              {...register("joiningAs")}
                              name="joiningAs"
                              border="1px  solid"
                              borderColor={
                                colorMode === "light"
                                  ? "brand.400"
                                  : "brand.450"
                              }
                              defaultValue={"writer"}
                            >
                              <option value="writer">Writer</option>
                              <option value="reader">Reader</option>
                            </Select>
                          </FormControl>
                          <FormControl isInvalid={!!errors?.email}>
                            <label>Email</label>
                            <Input
                              type="text"
                              placeholder="Enter email"
                              border="1px  solid"
                              borderColor={
                                colorMode === "light"
                                  ? "brand.400"
                                  : "brand.450"
                              }
                              // required
                              {...register("email", emailValidate)}
                            />

                            <FormErrorMessage>
                              {errors.email && errors.email?.message}
                            </FormErrorMessage>
                          </FormControl>
                          <FormControl isInvalid={!!errors?.password}>
                            <label>Password</label>
                            <Input
                              pr="4.5rem"
                              type="password"
                              placeholder="Enter password"
                              border="1px  solid"
                              borderColor={
                                colorMode === "light"
                                  ? "brand.400"
                                  : "brand.450"
                              }
                              {...register("password", passwordValidate)}
                            />
                            <FormErrorMessage>
                              {errors.password && errors.password.message}
                            </FormErrorMessage>
                          </FormControl>
                          <Button
                            w="100%"
                            bg="brand.600"
                            color="white"
                            type="submit"
                            _hover={{ bg: "brand.700" }}
                            isLoading={isLoading}
                          >
                            Create account
                          </Button>
                        </Flex>
                      </form>
                      <Flex fontSize="14px" justifyContent="center" mb={"35px"}>
                        <Text mr={1}>Have an account?</Text>
                        <Center color="blue.500" fontWeight={700}>
                          <Link href="/pages/signin">SIGN IN</Link>
                        </Center>
                      </Flex>
                      <OAuthButtons />
                    </Stack>
                  </Center>
                </HStack>
              </Stack>
            </Stack>
          </Center>
        </HStack>
      </Stack>
    </>
  );
}
