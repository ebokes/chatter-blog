import { Box, Button, Text } from "@chakra-ui/react";
// import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import Link from "next/link";

const NotFoundPage: React.FC = () => {
  const router = useRouter();

  return (
    <>
      {/* <NextSeo title="404 Error - Page Not Found" /> */}

      <Box
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bg="gray.100"
      >
        <Text fontSize="5xl" fontWeight="bold" mb={4}>
          404
        </Text>
        <Text fontSize="xl" mb={6}>
          Oops! The page you are looking for could not be found.
        </Text>
        <Text mb={4}>
          It seems you&apos;ve stumbled upon a broken link or entered a URL that
          doesn&apos;t exist.
        </Text>
        <Text mb={4}>Here are a few options to get back on track:</Text>
        <ul>
          <li>Double-check the URL for any typos or errors.</li>
          <li>
            Go back to the{" "}
            <Button colorScheme="blue" onClick={() => router.push("/")}>
              homepage
            </Button>
            .
          </li>
          <li>Contact the website administrator for further assistance.</li>
        </ul>
      </Box>
    </>
  );
};

export default NotFoundPage;
