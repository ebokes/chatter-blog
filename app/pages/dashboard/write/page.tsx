"use client";

import LiteEditor from "@/app/components/LiteEditor";
import TiptapEditor from "@/app/components/TipTap";
import { Flex, Stack } from "@chakra-ui/react";
import "firebase/firestore";
import React from "react";

const Write = (): React.JSX.Element => {
  return (
    <>
      <Stack maxW={"854px"} mx={"auto"} my={6} p={{ base: 0, md: 5 }}>
        <Flex pos={"relative"}>
          <LiteEditor />
          {/* <TiptapEditor /> */}
        </Flex>
      </Stack>
    </>
  );
};

export default Write;
