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
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { emailValidate, passwordValidate } from "../utils/form-validate";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { RxEyeClosed } from "react-icons/rx";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signInWithPopup } from "firebase/auth";
// import { auth, provider } from "../lib/firebase";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { FIREBASE_ERRORS } from "../lib/errors";
import { useRouter } from "next/navigation";
import { useLogin } from "../hooks/auth";

interface SignInForm {
  email: string;
  password: string;
}

export default function Signin() {
  const { colorMode } = useColorMode();
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);
  const [signInWithEmailAndPassword, signInUser, signInLoading, signInError] =
    useSignInWithEmailAndPassword(auth);
  const [user, loading, error] = useAuthState(auth);
  const { login, isLoading } = useLogin();
  // console.log("SignIn", signInUser?.user);
  // console.log("UseAuthState", user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();
  const router = useRouter();

  async function handleLogin(data: SignInForm) {
    const succeeded = await login({
      email: data.email,
      password: data.password,
      redirectTo: "/pages/dashboard",
    });
    // if (succeeded) reset();
    if (succeeded) console.log("SignIn successfull");
  }

  // const onSubmit = (data: SignInForm) => {
  //   signInWithEmailAndPassword(data.email, data.password);
  // };

  useEffect(() => {
    if (user) {
      router.push("/pages/dashboard");
    }
  }, [user, router]);

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
            <form onSubmit={handleSubmit(handleLogin)}>
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
                      type={showPassword ? "text" : "password"}
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
                        {showPassword ? (
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
                {signInError && (
                  <Text textAlign="center" mt={2} fontSize="10pt" color="red">
                    {
                      FIREBASE_ERRORS[
                        signInError?.message as keyof typeof FIREBASE_ERRORS
                      ]
                    }
                  </Text>
                )}
                <Button
                  w="100%"
                  bg="brand.600"
                  color="white"
                  type="submit"
                  // isLoading={signInLoading}
                  isLoading={isLoading}
                  _hover={{ bg: "brand.700" }}
                >
                  Login
                </Button>
              </Flex>
            </form>
          </Stack>
        </Center>
      </HStack>
    </Stack>
  );
}
