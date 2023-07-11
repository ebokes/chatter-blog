import { Button, ButtonGroup, useColorMode, useToast } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { ChatterContext } from "../context/ChatterContext";

const OAuthButtons = () => {
  const { colorMode } = useColorMode();
  const { googleUser, handleUserAuth } = useContext(ChatterContext);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (googleUser) {
      router.push("/pages/dashboard");
      toast({
        title: "Login successful",
        status: "success",
        isClosable: true,
        position: "top-right",
        duration: 5000,
      });
    }
  }, [googleUser, toast, router]);

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
        onClick={handleUserAuth}
      >
        Continue with google
      </Button>
    </ButtonGroup>
  );
};

export default OAuthButtons;
