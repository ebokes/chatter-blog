import React from "react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { BsBookmarkCheckFill, BsBookmarkPlus } from "react-icons/bs";
import { useUser } from "../hooks/user";
import Avatar from "./Avatar";
import Link from "next/link";
import { formatDate } from "../utils/funcns";

interface PostHeaderProps {
  post: {
    uid: string;
    role?: string;
    postedOn: number;
  };
}

const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  const { colorMode } = useColorMode();
  const { user, isLoading } = useUser(post.uid);

  if (isLoading || !user) return <div>Loading...</div>;

  return (
    <HStack justify="space-between" w="full">
      <Flex gap={2} mb="10px">
        <Avatar user={user} />
        <Box>
          <Link href={`/dashboard/profile/${user?.id}`}>
            <Heading fontSize="20px" fontWeight={600} mb={1}>
              {user?.displayName}
            </Heading>
          </Link>
          <HStack flexWrap="wrap">
            {user?.role ? (
              <>
                <Text>{post?.role}</Text>
                <Box
                  boxSize="4px"
                  bg={colorMode === "light" ? "brand.800" : "brand.400"}
                  borderRadius="full"
                />
              </>
            ) : (
              <>
                <Text>@{user?.email.split("@")[0]}</Text>
                <Box
                  boxSize="4px"
                  bg={colorMode === "light" ? "brand.800" : "brand.400"}
                  borderRadius="full"
                />
              </>
            )}
            {/* <Text>{post?.postedOn}</Text> */}
            <Text>{formatDate(post?.postedOn)}</Text>
          </HStack>
        </Box>
      </Flex>
    </HStack>
  );
};

export default PostHeader;
