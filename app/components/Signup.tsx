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
  Select,
  Stack,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import { signIn } from "next-auth/react";
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  emailValidate,
  firstNameValidate,
  lastNameValidate,
  passwordValidate,
} from "../utils/form-validate";
import { IconType } from "react-icons";
import { FiEye } from "react-icons/fi";
import { RxEyeClosed } from "react-icons/rx";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

// interface PasswordInputProps {
//   icon?: ReactElement<IconType>;
//   // password?: string;
// }

interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  joiningAs: string;
  password: string;
}

export default async function Signup({
  email,
  password,
}: SignUpForm): Promise<React.JSX.Element> {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();

  // const formSubmit = (data: SignUpForm) => console.log(data);
  const { colorMode } = useColorMode();

  const formSubmit = async (data: SignUpForm) => {
    try {
      const { email, password } = data;
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created successfully");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

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
              Register as a Writer/Reader
            </Heading>
            <form onSubmit={handleSubmit(formSubmit)}>
              <Flex flexDir="column" gap={6}>
                <HStack gap={6} flexDir={{ base: "column", sm: "row" }}>
                  <FormControl>
                    <label>First Name</label>
                    <Input
                      type="text"
                      placeholder="Enter First name"
                      border="1px  solid"
                      borderColor={
                        colorMode === "light" ? "brand.400" : "brand.450"
                      }
                      // required
                      {...register("firstName", firstNameValidate)}
                    />

                    <FormErrorMessage>
                      {errors.firstName && errors.firstName.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl>
                    <label>Last Name</label>
                    <Input
                      type="text"
                      placeholder="Enter Last name"
                      // required
                      border="1px  solid"
                      borderColor={
                        colorMode === "light" ? "brand.400" : "brand.450"
                      }
                      {...register("lastName", lastNameValidate)}
                    />
                    <FormErrorMessage>
                      {errors.lastName && errors.lastName.message}
                      {/* aria-invalid={errors.lastName ? "true" : "false"} */}
                    </FormErrorMessage>
                  </FormControl>
                </HStack>
                <FormControl>
                  <label>You are joining as?</label>
                  <Select
                    {...register("joiningAs")}
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
                    <FormErrorMessage>
                      {errors.password && errors.password.message}
                    </FormErrorMessage>
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
                </FormControl>
                <Button
                  w="100%"
                  bg="brand.600"
                  color="white"
                  type="submit"
                  _hover={{ bg: "brand.700" }}
                >
                  Create account
                </Button>
                <ButtonGroup display={"flex"} flexDir={"column"} spacing={0}>
                  <Button
                    border="1px  solid"
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
                    Sign up with google
                  </Button>
                  <Button
                    border="1px  solid"
                    borderColor={
                      colorMode === "light" ? "brand.400" : "brand.450"
                    }
                    // variant="solid"
                    w="full"
                    borderRadius="md"
                    p="5px"
                    mt="21px"
                    leftIcon={<FaLinkedin color="#0077b5" size={"24px"} />}
                  >
                    Sign up with Linkedin
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
