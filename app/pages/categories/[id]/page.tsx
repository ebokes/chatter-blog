import React from "react";
import Link from "next/link";
import { Box, Flex, Text } from "@chakra-ui/react";
import { usePostCategory, usePosts } from "@/app/hooks/post";

const page = () => {
  //   const { posts, isLoading: postsLoading } = usePosts();
  //   // const categories = Array.from(new Set(posts?.map((post) => post.category)));
  //   // const recentCategories = categories?.slice(0, 5);
  //   const { postCategory, isLoading } = usePostCategory();
  return (
    <Box>
      {/* <Text fontSize="md" fontWeight="bold" mb="4">
        Categories
      </Text>
      <Flex gap={2} flexWrap="wrap">
        {recentCategories?.map((category) => (
          <Link
            key={category}
            href={`/category/${encodeURIComponent(category)}`} // Specify the URL for the category page
            passHref
          >
            <ChakraLink
              px={2}
              py={1}
              borderRadius="2xl"
              border="1px solid"
              display="block"
              mb="2"
            >
              {category}
            </ChakraLink>
          </Link>
        ))}
      </Flex> */}
      Posts
    </Box>
  );
};

export default page;

// ...
