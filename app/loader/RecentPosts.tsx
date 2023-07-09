"use client";
// import { Skeleton } from "@chakra-ui/react";
// import React from "react";

// const RecentPosts = () => {
//   return (
//     <Skeleton>
//       <Skeleton />
//     </Skeleton>
//   );
// };

// export default RecentPosts;
import { Box, Heading, Skeleton } from "@chakra-ui/react";
import { usePost } from "../hooks/post";

export default function Card() {
  const { post, isLoading } = usePost("7c7bdd8c-b44f-4693-a017-fdfcf610bbb0");
  //   if (error) return <Box children='error' />
  return (
    <Box>
      <Skeleton isLoaded={!isLoading}>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Heading>{post?.title}</Heading>
      </Skeleton>
    </Box>
  );
}
