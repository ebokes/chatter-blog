import { Button, ButtonGroup, useColorMode, useToast } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useGoogle } from "../hooks/auth";

const OAuthButtons = () => {
  const { colorMode } = useColorMode();
  // const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const toast = useToast();
  // const router = useRouter();
  const {
    signInWithGoogle,
    googleUser,
    googleLoading,
    error: gError,
  } = useGoogle();
  // console.log("OauthButtonsGOO", gUser?.user);

  // useEffect(() => {
  //   if (gUser) {
  //     router.push("/pages/dashboard");
  //   }
  // }, [gUser, router]);

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
        leftIcon={<FcGoogle size={"24px"} />}
        bg={colorMode === "light" ? "brand.300" : "brand.800"}
        // color={colorMode === "light" ? "brand.900" : "brand.350"}
        isLoading={googleLoading}
        onClick={() => signInWithGoogle()}
      >
        Continue with google
      </Button>

      {gError &&
        toast({
          title: "Logging in failed",
          description: gError?.message,
          status: "error",
          isClosable: true,
          position: "top-right",
          duration: 5000,
        })}
    </ButtonGroup>
  );
};

export default OAuthButtons;
