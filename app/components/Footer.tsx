"use client";

import { ReactNode } from "react";

import {
  Box,
  Container,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import NextLink from "next/link";

const ListHeader = ({ children }: { children: ReactNode }) => {
  const { colorMode } = useColorMode();
  return (
    <Text
      fontWeight={"500"}
      fontSize={"lg"}
      mb={2}
      color={colorMode === "light" ? "brand.850" : "brand.300"}
    >
      {children}
    </Text>
  );
};

export default function Footer() {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={colorMode === "light" ? "brand.500" : "dark"}
      color={colorMode === "light" ? "brand.800" : "gray.400"}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 1fr 1fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Heading color="brand.600">CHATTER</Heading>
            </Box>
            <Text fontSize={"sm"}>© 2023 Chatter. All rights reserved</Text>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Product</ListHeader>
            <Link as={NextLink} href={"#"}>
              Overview
            </Link>
            <Link as={NextLink} href={"#"}>
              Features
            </Link>
            <Link as={NextLink} href={"#"}>
              Tutorials
            </Link>
            <Link as={NextLink} href={"#"}>
              Pricing
            </Link>
            <Link as={NextLink} href={"#"}>
              Releases
            </Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Link as={NextLink} href={"#"}>
              About
            </Link>
            <Link as={NextLink} href={"#"}>
              Press
            </Link>
            <Link as={NextLink} href={"#"}>
              Careers
            </Link>
            <Link as={NextLink} href={"#"}>
              Contact
            </Link>
            <Link as={NextLink} href={"#"}>
              Partners
            </Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Link as={NextLink} href={"#"}>
              Help Center
            </Link>
            <Link as={NextLink} href={"#"}>
              Terms of Service
            </Link>
            <Link as={NextLink} href={"#"}>
              Legal
            </Link>
            <Link as={NextLink} href={"#"}>
              Privacy Policy
            </Link>
            <Link as={NextLink} href={"#"}>
              Status
            </Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Follow Us</ListHeader>
            <Link as={NextLink} href={"#"}>
              Facebook
            </Link>
            <Link as={NextLink} href={"#"}>
              Twitter
            </Link>
            <Link as={NextLink} href={"#"}>
              Dribbble
            </Link>
            <Link as={NextLink} href={"#"}>
              Instagram
            </Link>
            <Link as={NextLink} href={"#"}>
              LinkedIn
            </Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
