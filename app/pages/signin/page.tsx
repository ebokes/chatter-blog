"use client";

import OAuthButtons from "@/app/components/OAuthButtons";
import Navbar from "@/app/components/nav/Navbar";
import { useLogin } from "@/app/hooks/auth";
import { auth } from "@/app/lib/firebase";
import { emailValidate, passwordValidate } from "@/app/utils/form-validate";
import {
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
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { FiEye } from "react-icons/fi";
import { RxEyeClosed } from "react-icons/rx";

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
  console.log("SignIn", signInUser?.user);
  console.log("UseAuthState", user);
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
    // if (succeeded) console.log("SignIn successfull");
  }

  useEffect(() => {
    if (user) {
      router.push("/pages/dashboard");
    }
  }, [user, router]);

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
            <Stack
              alignSelf={"flex-start"}
              maxW={"520px"}
              w={"full"}
              py={"35px"}
              px={{ base: "15px", md: "25px" }}
            >
              <Stack>
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
                        color={
                          colorMode === "light" ? "brand.850" : "brand.300"
                        }
                        maxW={"520px"}
                        w={"full"}
                      >
                        Sign In
                      </Heading>
                      <form onSubmit={handleSubmit(handleLogin)}>
                        <Flex flexDir="column" gap={6}>
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
                              {...register("email", emailValidate)}
                            />
                            <FormErrorMessage>
                              {errors.email && errors.email?.message}
                            </FormErrorMessage>
                          </FormControl>
                          <FormControl isInvalid={!!errors?.password}>
                            <label>Password</label>
                            <InputGroup size="md">
                              <Input
                                pr="4.5rem"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                border="1px  solid"
                                borderColor={
                                  colorMode === "light"
                                    ? "brand.400"
                                    : "brand.450"
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
                          <Button
                            w="100%"
                            bg="brand.600"
                            color="white"
                            type="submit"
                            isLoading={isLoading}
                            _hover={{ bg: "brand.700" }}
                          >
                            Login
                          </Button>
                        </Flex>
                      </form>
                      <Flex fontSize="14px" justifyContent="center">
                        <Text mr={1}>Don&apos;t have an account?</Text>
                        <Center color="blue.500" fontWeight={700}>
                          <Link href="/pages/signup">SIGN UP</Link>
                        </Center>
                      </Flex>
                    </Stack>
                  </Center>
                </HStack>
                <OAuthButtons />
              </Stack>
            </Stack>
          </Center>
        </HStack>
      </Stack>
    </>
  );
}
