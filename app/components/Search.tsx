"use client";

import { useContext } from "react";
import { ChatterContext } from "../context/ChatterContext";
import { usePosts } from "../hooks/post";
import { Box, Input, useColorMode } from "@chakra-ui/react";

const Search: React.FC = () => {
  const { colorMode } = useColorMode();
  const { posts } = usePosts();
  const { setSearchResults, searchTerm, setSearchTerm } =
    useContext(ChatterContext);

  const handleSearch = (e: any) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filteredPosts = posts?.filter((post) => {
      const categoryLower = post?.category?.toLowerCase();
      const titleLower = post?.title?.toLowerCase();
      // const authorLower = post?.author?.toLowerCase();
      const searchLower = value.toLowerCase();

      return (
        categoryLower.includes(searchLower) ||
        // authorLower.includes(searchLower) ||
        titleLower.includes(searchLower)
      );
    });

    setSearchResults(filteredPosts);
  };

  return (
    <Box mr={"9px"}>
      <Input
        maxW="20rem"
        placeholder="Search Chatter..."
        borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
        borderRadius="5px"
        justifySelf={"flex-start"}
        onChange={handleSearch}
        value={searchTerm}
      />
    </Box>
  );
};

export default Search;
