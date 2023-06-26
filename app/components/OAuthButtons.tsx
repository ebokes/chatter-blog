import {
  ButtonGroup,
  Button,
  useColorMode,
  Text,
  useToast,
} from "@chakra-ui/react";
import { signInWithPopup } from "firebase/auth";
import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

interface Props {}

const OAuthButtons = (props: Props) => {
  const { colorMode } = useColorMode();
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const toast = useToast();
  const router = useRouter();
  console.log("OauthButtonsGOO", gUser?.user);

  useEffect(() => {
    if (gUser) {
      router.push("/pages/dashboard");
    }
  }, [gUser, router]);

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
        // color={colorMode === "light" ? "brand.900" : "brand.350"}
        isLoading={gLoading}
        onClick={() => signInWithGoogle()}
      >
        Continue with google
      </Button>
      {/* <Button
        border="1px solid"
        borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
        w="full"
        borderRadius="md"
        p="5px"
        mt="21px"
        isLoading={fbLoading}
        onClick={() => signInWithFacebook()}
        bg={colorMode === "light" ? "brand.300" : "brand.800"}
        leftIcon={<FaFacebook color="#0077b5" size={"24px"} />}
      >
        Continue with Facebook
      </Button> */}
      {gError &&
        toast({
          title: "Logging in failed",
          // description: gUser?.message,
          // description: gUser?.message,
          status: "error",
          isClosable: true,
          position: "top-right",
          duration: 5000,
        })}
    </ButtonGroup>
  );
};

export default OAuthButtons;
