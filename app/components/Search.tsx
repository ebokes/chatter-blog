import {
  VStack,
  Heading,
  Input,
  Divider,
  Box,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaUser, FaBlog } from "react-icons/fa";
import { useSearchFirebase } from "../hooks/search";

const Search = () => {
  const { colorMode } = useColorMode();
  const [searchTerm, setSearchTerm] = useState("");
  const { users, posts } = useSearchFirebase(searchTerm);

  console.log("users", users);
  console.log("posts", posts);

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box>
      <VStack>
        <Box pos={"relative"}>
          <Input
            maxW="20rem"
            placeholder="Search Chatter..."
            borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
            borderRadius="5px"
            justifySelf={"flex-start"}
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </Box>
        <Box
          pos={"absolute"}
          top={"50px"}
          zIndex={"10"}
          bg={"white"}
          w={"200px"}
        >
          {searchTerm.length > 0 && (
            <Box>
              <Divider />
              <Text>
                <FaUser /> Users
              </Text>
              {users?.map((user) => (
                <Text key={user.id}>{user.displayName}</Text>
                // Render additional user details as needed
              ))}
              <Text>
                <FaBlog /> Posts
              </Text>
              {posts?.map((post) => (
                <Text key={post.id}>{post.title}</Text>
                // Render additional post details as needed
              ))}
            </Box>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default Search;
