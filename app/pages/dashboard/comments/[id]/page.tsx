"use client";

import NewComment from "@/app/components/NewComment";
import { Heading, Box } from "@chakra-ui/react";
import React from "react";

const Comments = () => {
  return (
    <>
      <Box my={"30px"}>
        <Heading fontSize={"3xl"} mb={"34px"}>
          Comments
        </Heading>
        <NewComment />
      </Box>
    </>
  );
};

export default Comments;
