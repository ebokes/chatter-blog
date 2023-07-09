import { Flex, HStack, Button, Icon, Text, IconButton } from "@chakra-ui/react";
import React from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
// import { useAuth } from "../hooks/auth";
// import { useDeletePost, useToggleLike } from "../hooks/post";
import { FaComment, FaRegComment, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/app/hooks/auth";
import { useComments } from "@/app/hooks/comments";
import { useToggleLike, useDeletePost } from "@/app/hooks/post";
import Confirm from "../Confirm";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
// import { useComments } from "../hooks/comments";

const PostActions = ({ post, link }: any) => {
  const { likes, id, uid } = post;
  const { user, isLoading: userLoading } = useAuth();
  // const { user, isLoading: userLoading } = useUser();
  const isLiked = likes?.includes(user?.id);
  const config = { id, isLiked, uid: user?.id };
  const { toggleLike, isLoading: likeLoading } = useToggleLike(config);
  const { deletePost, isLoading: deleteLoading } = useDeletePost(id);
  const { comments, isLoading: commentsLoading } = useComments(id);
  const path = usePathname();
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
            href={`/pages/${link}/${post.id}`}
            aria-label="comments"
            // isLoading={commentsLoading}
            size="md"
            colorScheme="blue"
            variant="ghost"
            icon={comments?.length === 0 ? <FaRegComment /> : <FaComment />}
            isRound
          />
          <Text>{comments?.length}</Text>
        </HStack>
        <HStack spacing={"1px"}>
          {!userLoading &&
            user?.id === uid &&
            path.includes("/pages/profile/") && (
              // <Confirm>
              <IconButton
                ml="auto"
                aria-label="delete post"
                onClick={deletePost}
                isLoading={deleteLoading}
                size="md"
                colorScheme="red"
                variant="ghost"
                icon={<FaTrash />}
                isRound
              />
              // </Confirm>
            )}
        </HStack>
      </HStack>
    </Flex>
  );
};

export default PostActions;
