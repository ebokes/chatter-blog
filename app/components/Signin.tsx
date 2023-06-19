"use client";

import {
  Button,
  ButtonGroup,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { emailValidate, passwordValidate } from "../utils/form-validate";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { RxEyeClosed } from "react-icons/rx";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface SignInForm {
  email: string;
  password: string;
}

export default function Signin() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();

  // const formSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);
  const formSubmit = (data: SignInForm) => console.log(data);

  const { colorMode } = useColorMode();
  return (
    <Stack mx="auto">
      <HStack align={"stretch"}>
        <Center mx="auto" flex={1}>
          <Stack alignSelf={"flex-start"} maxW={"520px"} w={"full"} py={"35px"}>
            <Heading
              textAlign="center"
              mb="26px"
              mt={"30px"}
              color={colorMode === "light" ? "brand.850" : "brand.300"}
            >
              Welcome back
            </Heading>
            <form onSubmit={handleSubmit(formSubmit)}>
              <Flex flexDir="column" gap={6}>
                <FormControl>
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
                <FormControl>
                  <label>Password</label>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                      // required
                      border="1px  solid"
                      borderColor={
                        colorMode === "light" ? "brand.400" : "brand.450"
                      }
                      {...register("password", passwordValidate)}
                    />
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
                        {show ? (
                          <FiEye size={"20px"} />
                        ) : (
                          <RxEyeClosed size={"20px"} />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
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
                >
                  Login
                </Button>
                <ButtonGroup display={"flex"} flexDir={"column"} spacing={0}>
                  <Button
                    border="1px solid"
                    borderColor={
                      colorMode === "light" ? "brand.400" : "brand.450"
                    }
                    w="full"
                    borderRadius="md"
                    p="5px"
                    textAlign="center"
                    onClick={() => signIn("google")}
                    leftIcon={<FcGoogle size={"24px"} />}
                  >
                    Sign in with google
                  </Button>
                  <Button
                    border="1px solid"
                    borderColor={
                      colorMode === "light" ? "brand.400" : "brand.450"
                    }
                    w="full"
                    borderRadius="md"
                    p="5px"
                    mt="21px"
                    leftIcon={<FaLinkedin color="#0077b5" size={"24px"} />}
                  >
                    Sign in with Linkedin
                  </Button>
                </ButtonGroup>
              </Flex>
            </form>
          </Stack>
        </Center>
      </HStack>
    </Stack>
  );
}
