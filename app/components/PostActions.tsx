import { Flex, HStack, Button, Icon, Text, IconButton } from "@chakra-ui/react";
import React from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useAuth } from "../hooks/auth";
import { useDeletePost, useToggleLike } from "../hooks/post";
import { FaComment, FaRegComment, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { useComments } from "../hooks/comments";

const PostActions = ({ post }: any) => {
  const { likes, id } = post;
  const { user, isLoading: userLoading } = useAuth();
  const isLiked = likes?.includes(user?.id);
  const config = { id, isLiked, uid: user?.id };
  const { toggleLike, isLoading: likeLoading } = useToggleLike(config);
  const { deletePost, isLoading: deleteLoading } = useDeletePost(id);
  const { comments, isLoading: commentsLoading } = useComments(id);

  return (
    <Flex justify={"flex-end"}>
      <HStack gap={"20px"} w={"full"} justify={"flex-end"}>
        <HStack spacing={"1px"}>
          <IconButton
            onClick={toggleLike}
            isLoading={likeLoading || userLoading}
            icon={isLiked ? <AiFillLike /> : <AiOutlineLike />}
            variant={"ghost"}
            aria-label={"like"}
          />
          <Text>{likes?.length}</Text>
        </HStack>
        <HStack spacing={"1px"}>
          <IconButton
            as={Link}
            href={`/pages/dashboard/${id}`}
            aria-label="comments"
            // isLoading={commentsLoading}
            size="md"
            colorScheme="teal"
            variant="ghost"
            icon={comments?.length === 0 ? <FaRegComment /> : <FaComment />}
            isRound
          />
          <Text>{comments?.length}</Text>
        </HStack>
        <HStack spacing={"1px"}>
          {/* {!userLoading && user.id === uid && ( */}
          <IconButton
            ml="auto"
            aria-label="delete post"
            // onClick={deletePost}
            // isLoading={deleteLoading}
            size="md"
            colorScheme="red"
            variant="ghost"
            icon={<FaTrash />}
            isRound
          />
          {/* )} */}
        </HStack>
      </HStack>
    </Flex>
  );
};

export default PostActions;
