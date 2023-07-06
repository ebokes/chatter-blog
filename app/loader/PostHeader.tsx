import {
  Box,
  Flex,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import React from "react";

const PostHeaderLoader = () => {
  return (
    <HStack justify="space-between" w="full">
      <Flex gap={2} mb="10px">
        <SkeletonCircle size="40px" />
        {/* <Avatar user={user} /> */}
        <Box>
          <Skeleton height={"20px"} />
          {/* <Link href={`/pages/profile/${user?.id}`}>
            <Heading fontSize="20px" fontWeight={600} mb={1}>
              {user?.displayName}
            </Heading>
          </Link> */}
          <HStack flexWrap="wrap">
            <SkeletonText />
            <SkeletonText />
          </HStack>
        </Box>
      </Flex>
    </HStack>
  );
};

export default PostHeaderLoader;
