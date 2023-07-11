import { Box, Button, useColorMode } from "@chakra-ui/react";
import React from "react";

const CategoryBtn = ({ children, rest }: any) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      as={Button}
      variant={"outline"}
      borderRadius={"35px"}
      h={"35px"}
      bg={colorMode === "light" ? "brand.100" : "dark"}
      color={colorMode === "light" ? "brand.850" : "brand.350"}
    >
      {children}
    </Box>
  );
};

export default CategoryBtn;
