"use client";

import Navbar from "@/app/components/nav/Navbar";
import {
  Box,
  HStack,
  Heading,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";

const AboutUs = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Navbar />
      <Box p={8} maxW={"1200px"} mx={"auto"}>
        <HStack
          spacing={8}
          justify={"space-between"}
          flexDir={{ base: "column", md: "row" }}
        >
          <Box>
            <Heading
              as="h1"
              size="xl"
              color={colorMode === "light" ? "brand.800" : "brand.400"}
            >
              About Us
            </Heading>
            <Box maxW="500px">
              <Text
                fontSize="lg"
                color={colorMode === "light" ? "brand.900" : "brand.300"}
              >
                Welcome to Chatter, the ultimate platform for writers and
                readers to connect and share their thoughts and ideas. Whether
                you&apos;re a passionate writer or an avid reader, Chatter
                provides a space where you can unleash the power of words and
                engage with like-minded individuals.
              </Text>
              {/* Rest of the content */}
            </Box>
          </Box>
          <Box maxW="400px">
            <Image
              src="https://img.freepik.com/free-photo/silhouette-confident-man-office_1098-2331.jpg?w=1800&t=st=1688733514~exp=1688734114~hmac=7fe2d5e95fddbc0356fdc6641b033808f2f00d24a1bc432a6dc882b27adb88fa" // Replace with the path to your vector image
              alt="Vector Image"
              boxSize="100%"
              objectFit="cover"
              mb={"-15px"}
              border={"1px solid red"}
            />
          </Box>
        </HStack>
      </Box>
    </>
  );
};

export default AboutUs;
