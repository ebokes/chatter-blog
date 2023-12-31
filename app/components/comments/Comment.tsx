"use client";

import {
  Box,
  Flex,
  HStack,
  Heading,
  IconButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";
import { BsTrash } from "react-icons/bs";
import { useAuth } from "../../hooks/auth";
import { useUser } from "../../hooks/user";
import { formatDate } from "../../utils/funcns";
import Avatar from "../Avatar";
import { useDeleteComment } from "@/app/hooks/comments";

const Comment = ({ comment }: any) => {
  const { text, date, uid, id } = comment;
  const { colorMode } = useColorMode();
  const { user, isLoading } = useUser(uid);
  const { user: userAuth, isLoading: authLoading } = useAuth();
  const { deleteComment, isLoading: deleteLoading } = useDeleteComment(id);

  if (isLoading || !user) return <div>Loading...</div>;

  return (
    <Flex gap={"10px"}>
      <Avatar user={user} size="sm" />
      <Flex justify={"space-between"} w={"full"}>
        <Box>
          <Flex align={"center"}>
            <Box>
              <Link href={`/dashboard/profile/${user?.id}`}>
                <Heading fontSize={"16px"} fontWeight={600}>
                  {user?.displayName}
                </Heading>
              </Link>
            </Box>
            <Box
              bg={colorMode === "light" ? "brand.800" : "brand.400"}
              borderRadius={"full"}
              mx={2}
              w={"4px"}
              h={"4px"}
            />
            <Text>{formatDate(date)}</Text>
          </Flex>
          <Flex>
            <Text>{text}</Text>
          </Flex>
        </Box>
        <HStack spacing={"1px"}>
          {!authLoading && userAuth?.id === uid && (
            <IconButton
              ml="auto"
              aria-label="delete post"
              onClick={deleteComment}
              isLoading={deleteLoading}
              colorScheme="red"
              variant="ghost"
              icon={<BsTrash />}
              isRound
            />
          )}
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Comment;
