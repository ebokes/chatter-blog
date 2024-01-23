"use client";

import {
  Box,
  Button,
  Center,
  Flex,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";

export default function SimpleNav() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      width="full"
      bg={colorMode === "light" ? "brand.300" : "brand.800"}
      borderBottom={"1px solid"}
      // borderBottomColor={colorMode === "light" ? "brand.400" : "brand.450"}
      borderBottomColor={colorMode === "light" ? "brand.400" : "#2D3748"}
    >
      <Flex
        color={colorMode === "light" ? "brand.800" : "brand.300"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 2, sm: 6 }}
        align={"center"}
        maxW={"1200px"}
        mx={"auto"}
        justify={"space-between"}
      >
        <Box w={"20px"} />

        <Center
          textAlign={useBreakpointValue({ base: "center", md: "left" })}
          fontFamily={"heading"}
          color="brand.600"
          fontWeight={"bold"}
          _hover={{ textDecoration: "none" }}
        >
          <Link href="/">CHATTER</Link>
        </Center>

        <Button
          aria-label="Toggle Color Mode"
          onClick={toggleColorMode}
          mr={5}
          _focus={{ boxShadow: "none" }}
          w="fit-content"
          variant={"ghost"}
          _hover={{ variant: "ghost" }}
          _active={{ variant: "ghost" }}
        >
          {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
        </Button>
      </Flex>
    </Box>
  );
}
