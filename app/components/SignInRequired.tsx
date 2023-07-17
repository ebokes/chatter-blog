import { Box, Heading, Link, Text, useColorMode } from "@chakra-ui/react";
import NextLink from "next/link";

const SignInRequired: React.FC = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={20}
      p={8}
      //   bg="gray.100"
      borderRadius="md"
      bg={colorMode === "light" ? "brand.200" : "brand.800"}
    >
      <Heading as="h1" mb={4} textAlign="center">
        Access Restricted: Sign In Required
      </Heading>
      <Text textAlign="center" mb={8}>
        We&apos;re sorry, but the content of this page is only accessible to
        registered users.
      </Text>
      <Text textAlign="center" mb={8}>
        To gain access, please{" "}
        <Link color="blue.500" href="/pages/signin">
          Sign In
        </Link>{" "}
        to your account.
      </Text>
      <Text textAlign="center" mb={8}>
        If you don&apos;t have an account yet, you can easily create one by
        clicking on the{" "}
        <NextLink href="/pages/signup" passHref>
          <Link color="blue.500">Sign Up</Link>
        </NextLink>{" "}
        link below.
      </Text>
      <Text textAlign="center" mb={8}>
        Signing in will allow you to explore a wide range of features and
        personalized content tailored to your interests. It&apos;s quick, easy,
        and free!
      </Text>
      <Text textAlign="center" mb={8}>
        Once you&apos;ve signed in, you&apos;ll be able to enjoy the full
        benefits of our platform and access the requested page.
      </Text>
      {/* <Text textAlign="center" mb={8}>
        If you believe you&apos;ve reached this page in error or have any other
        questions, please don&apos;t hesitate to{" "}
        <NextLink href="/contact" passHref>
          <Link color="blue.500">contact our support team</Link>
        </NextLink>{" "}
        for assistance.
      </Text> */}
      <Text textAlign="center">Thank you for your understanding.</Text>
    </Box>
  );
};

export default SignInRequired;
