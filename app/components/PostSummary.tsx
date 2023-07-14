"use client";

import {
  Box,
  Center,
  Grid,
  GridItem,
  HStack,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PostDetail, PostHighlights } from "../utils/constants";

const PostSummary = () => {
  return (
    <Box>
      <Heading as="h4" size="lg" fontWeight={500} mb={3}>
        Posts Summary
      </Heading>
      <HStack>
        <Text fontWeight={300} fontSize={"16px"} display={"inline-block"}>
          May 2023 summary
        </Text>
      </HStack>
      {PostDetail.map((item) => (
        <Box borderTop={"3px solid #543EE0"} key={item.title} my={6}>
          <Stack mt={27}>
            <Heading as="h4" size="md" fontWeight={600} mb={3}>
              Posts Highlights
            </Heading>
          </Stack>
          <Grid
            h="200px"
            templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }}
            templateRows={{ base: "repeat(4, 1fr)", sm: "repeat(2, 1fr)" }}
            gap={8}
            maxW="lg"
          >
            {PostHighlights.map((item) => (
              <GridItem
                key={item.title}
                placeSelf={{ base: "center", sm: "start" }}
              >
                <Center>
                  <Center flexDir={"column"}>
                    <Heading
                      as="h4"
                      size="md"
                      fontWeight={600}
                      mb={3}
                      color={"#626262"}
                    >
                      {item.title}
                    </Heading>
                    <Text>{item.count}</Text>
                  </Center>
                </Center>
              </GridItem>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default PostSummary;
