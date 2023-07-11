import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Avatar from "../Avatar";
import Link from "next/link";
import { formatDate } from "@/app/utils/funcns";
import { useUser } from "@/app/hooks/user";
import PostHeaderSkeleton from "@/app/loader/PostHeaderSkeleton";

interface PostHeaderProps {
  post: {
    uid: string;
    role?: string;
    postedOn: number;
    category: string;
  };
}

const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  const { colorMode } = useColorMode();
  const { user, isLoading } = useUser(post.uid);

  if (isLoading || !user) return <PostHeaderSkeleton />;

  return (
    <HStack justify="space-between" w="full">
      <Flex gap={2} mb="10px">
        <Avatar user={user} />
        <Box>
          <Link href={`/pages/profile/${user?.id}`}>
            <Heading fontSize="20px" fontWeight={600} mb={1}>
              {user?.displayName}
            </Heading>
          </Link>
          <HStack flexWrap="wrap">
            <Text>@{user?.email?.split("@")[0]}</Text>
            <Box
              boxSize="4px"
              bg={colorMode === "light" ? "brand.800" : "brand.400"}
              borderRadius="full"
            />
            <Text>{formatDate(post?.postedOn)}</Text>
          </HStack>
        </Box>
      </Flex>
    </HStack>
  );
};

export default PostHeader;
