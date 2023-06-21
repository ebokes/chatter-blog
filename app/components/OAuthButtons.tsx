import {
  ButtonGroup,
  Button,
  useColorMode,
  Text,
  useToast,
} from "@chakra-ui/react";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../lib/firebase";
// import { auth, provider } from "../lib/firebase";

interface Props {}

const OAuthButtons = (props: Props) => {
  const { colorMode } = useColorMode();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const toast = useToast();

  //   const GoogleLogin = async () => {

  return (
    <ButtonGroup
      display={"flex"}
      flexDir={"column"}
      spacing={0}
      color={colorMode === "light" ? "brand.300" : "brand.850"}
    >
      <Button
        border="1px solid"
        borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
        w="full"
        borderRadius="md"
        p="5px"
        textAlign="center"
        // onClick={() => signIn("google")}
        // onClick={GoogleLogin}
        leftIcon={<FcGoogle size={"24px"} />}
        bg={colorMode === "light" ? "brand.300" : "brand.800"}
        color={colorMode === "light" ? "brand.900" : "brand.350"}
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        Continue with google
      </Button>
      <Button
        border="1px solid"
        borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
        w="full"
        borderRadius="md"
        p="5px"
        mt="21px"
        bg={colorMode === "light" ? "brand.300" : "brand.800"}
        leftIcon={<FaLinkedin color="#0077b5" size={"24px"} />}
      >
        Continue with Linkedin
      </Button>
      {error &&
        toast({
          title: "Logging in failed",
          description: error.message,
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
        })}
    </ButtonGroup>
  );
};

export default OAuthButtons;
