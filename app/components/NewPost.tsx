"use client";

import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { TfiClose, TfiPlus } from "react-icons/tfi";
import { IconType } from "react-icons";

interface NewPostProps {
  icon: ReactElement<IconType>;
}

const NewPost = ({ icon }: NewPostProps): React.JSX.Element => {
  const [open, setOpen] = useState(false);
  return (
    <Box ml={{ base: "", md: "60px" }} px={5} border="1px solid #d0d0d0">
      <Stack
        maxW={"854px"}
        mx={"auto"}
        border={"1px solid #d0d0d0"}
        my={6}
        p={5}
      >
        <Flex justify={"space-between"} w={"100%"}>
          <Box w={"78px"} />
          <Button bg="#543EE0" color="#fff" _hover={{ bg: "#715fe3" }}>
            Publish
          </Button>
        </Flex>
        <Flex pos={"relative"}>
          <Textarea
            maxW={"full"}
            minH={"800px"}
            ml={"45px"}
            placeholder="Enter text in markdown text"
            zIndex={5}
          />
          <HStack pos={"absolute"} top={16} height={"44px"}>
            <IconButton
              onClick={() => setOpen(!open)}
              aria-label="Add media"
              icon={open ? <TfiPlus /> : <TfiClose />}
              fontSize={"20px"}
              border={"1px solid black"}
              borderRadius={"50%"}
              variant="outline"
            />
            {!open && (
              <HStack zIndex={6}>
                <Divider orientation="horizontal" h={12} color={"#543EE0"} />
                <HStack>
                  <IconButton
                    aria-label="Add Image"
                    icon={<CiImageOn />}
                    fontSize={"25px"}
                    border={"1px solid #543EE0"}
                    borderRadius={"50%"}
                    color={"#543EE0"}
                    variant="outline"
                  />
                </HStack>
              </HStack>
            )}
          </HStack>
        </Flex>
      </Stack>
    </Box>
  );
};

export default NewPost;
