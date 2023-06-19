"use client";

import { Box, Center, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Center w={"full"} h={"100vh"}>
      <Spinner size="xl" />;
    </Center>
  );
};

export default Loading;
