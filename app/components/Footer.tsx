"use client";

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
import { footer } from "../utils/constants";

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

            <Box>
              <Text fontSize={"sm"}>Built & Developed by</Text>
              <Box color={"brand.600"} fontWeight={600}>
                <Link
                  href="https://chibuokemegbuchulam.netlify.app/"
                  target="_blank"
                  fontSize={"sm"}
                >
                  Chibuokem Egbuchulam
                </Link>
              </Box>
            </Box>
          </Stack>
          {footer.map(({ title, child }) => (
            <Stack align={"flex-start"} key={title}>
              <Text
                fontWeight={"500"}
                fontSize={"lg"}
                mb={2}
                color={colorMode === "light" ? "brand.850" : "brand.300"}
              >
                {title}
              </Text>
              {child.map(({ link, item }) => (
                <Link as={NextLink} href={link} key={item}>
                  {item}
                </Link>
              ))}
            </Stack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
