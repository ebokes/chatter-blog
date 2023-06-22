import React, { useState } from "react";
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
  Select,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import {
  firstNameValidate,
  lastNameValidate,
  emailValidate,
  passwordValidate,
  userNameValidate,
} from "../utils/form-validate";
import { FiEye } from "react-icons/fi";
import { RxEyeClosed } from "react-icons/rx";
import { useForm } from "react-hook-form";
import { FIREBASE_ERRORS } from "../lib/errors";
import { useRegister } from "../hooks/auth";

interface SignUpForm {
  username: string;
  firstName: string;
  lastName: string;
  joiningAs: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { colorMode } = useColorMode();
  const [showPassword, setShowPassword] = useState(false);
  const [createUserWithEmailAndPassword, user, loading, authError] =
    useCreateUserWithEmailAndPassword(auth);
  const { register: signup, isLoading } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();

  // const onSubmit = (data: SignUpForm) => {
  //   createUserWithEmailAndPassword(data.email, data.password);
  // };

  async function handleRegister(data: SignUpForm) {
    signup({
      username: data.username,
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
            <form onSubmit={handleSubmit(handleRegister)}>
              <Flex flexDir="column" gap={6}>
                <HStack gap={6} flexDir={{ base: "column", sm: "row" }}>
                  <FormControl>
                    <label>First Name</label>
                    <Input
                      // name="firstName"
                      type="text"
                      placeholder="Enter First name"
                      border="1px  solid"
                      borderColor={
                        colorMode === "light" ? "brand.400" : "brand.450"
                      }
                      // onChange={onChange}
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
                    </FormErrorMessage>
                  </FormControl>
                </HStack>
                <FormControl>
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
                  {/* <FormErrorMessage>
                    {errors.username && errors.username?.message}
                  </FormErrorMessage> */}
                </FormControl>
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
                        {showPassword ? (
                          <FiEye size={"20px"} />
                        ) : (
                          <RxEyeClosed size={"20px"} />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                {authError && (
                  <Text textAlign="center" mt={2} fontSize="10pt" color="red">
                    {
                      FIREBASE_ERRORS[
                        authError?.message as keyof typeof FIREBASE_ERRORS
                      ]
                    }
                  </Text>
                )}

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
          </Stack>
        </Center>
      </HStack>
    </Stack>
  );
};
export default SignUp;
