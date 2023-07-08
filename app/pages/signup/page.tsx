"use client";

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
  Link,
  Select,
  Stack,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiEye } from "react-icons/fi";
import { RxEyeClosed } from "react-icons/rx";
import { useRegister } from "@/app/hooks/auth";
import { auth } from "@/app/lib/firebase";
import {
  emailValidate,
  firstNameValidate,
  lastNameValidate,
  passwordValidate,
  userNameValidate,
} from "@/app/utils/form-validate";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import OAuthButtons from "@/app/components/OAuthButtons";
import NextLink from "next/link";
// import { auth } from "../lib/firebase";

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
  const [showPassword, setShowPassword] = useState(false);
  useCreateUserWithEmailAndPassword(auth);
  const { register: signup, isLoading } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();

  async function handleRegister(data: SignUpForm) {
    signup({
      // username: data.username,
      followMe: [],
      iFollow: [],
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      joiningAs: data.joiningAs,
      redirectTo: "/pages/dashboard",
    });
  }

  const handleClick = () => setShowPassword(!showPassword);

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
            <Stack mx="auto">
              <HStack align={"stretch"}>
                <Center mx="auto" flex={1}>
                  <Stack
                    alignSelf={"flex-start"}
                    maxW={"520px"}
                    w={"full"}
                    py={"35px"}
                  >
                    <Heading
                      textAlign="center"
                      mb="26px"
                      mt={"30px"}
                      color={colorMode === "light" ? "brand.850" : "brand.300"}
                    >
                      Register as a Writer/Reader
                    </Heading>
                    <form onSubmit={handleSubmit(handleRegister)}>
                      <Flex flexDir="column" gap={6}>
                        <HStack gap={6} flexDir={{ base: "column", sm: "row" }}>
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
                        {/* <FormControl isInvalid={!!errors?.username}>
                          <label>Username</label>
                          <Input
                            type="text"
                            placeholder="Enter username"
                            border="1px  solid"
                            borderColor={
                              colorMode === "light" ? "brand.400" : "brand.450"
                            }
                            // required
                            {...register("username", userNameValidate)}
                          />

                          <FormErrorMessage>
                            {errors.username && errors.username?.message}
                          </FormErrorMessage>
                        </FormControl> */}
                        <FormControl>
                          <label>You are joining as?</label>
                          <Select
                            {...register("joiningAs")}
                            name="joiningAs"
                            border="1px  solid"
                            borderColor={
                              colorMode === "light" ? "brand.400" : "brand.450"
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
                              colorMode === "light" ? "brand.400" : "brand.450"
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
                          <InputGroup size="md">
                            <Box w={"full"}>
                              <Input
                                pr="4.5rem"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                // required
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
                            </Box>
                            <InputRightElement width="4.5rem">
                              <Button
                                h="1.75rem"
                                size="sm"
                                onClick={handleClick}
                                mr="-15.5px"
                                variant="ghost"
                                _hover={{ variant: "ghost" }}
                                _active={{ variant: "ghost" }}
                                opacity={0.7}
                              >
                                {showPassword ? (
                                  <FiEye size={"20px"} />
                                ) : (
                                  <RxEyeClosed size={"20px"} />
                                )}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
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
                    <Flex fontSize="14px" justifyContent="center">
                      <Text mr={1}>Have an account?</Text>
                      <Link
                        as={NextLink}
                        href="/pages/signin"
                        color="blue.500"
                        fontWeight={700}
                        cursor="pointer"
                      >
                        SIGN IN
                      </Link>
                    </Flex>
                  </Stack>
                </Center>
              </HStack>
            </Stack>
            <OAuthButtons />
          </Stack>
        </Center>
      </HStack>
    </Stack>
  );
}
