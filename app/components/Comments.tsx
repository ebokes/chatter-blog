import { Avatar, Box, Flex, Heading, Textarea } from "@chakra-ui/react";
import React from "react";

const Comments = () => {
  return (
    <Box my={"30px"}>
      <Heading fontSize={"3xl"} mb={"34px"}>
        Comments
      </Heading>
      <Flex gap={"10px"}>
        <Avatar name="Chibuokem Egbuchulam" />
        <Textarea placeholder="Add to the discussion" flex={0.9} />
      </Flex>
    </Box>
  );
};

export default Comments;
