import { Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useAuth } from "@/app/hooks/auth";
import { useComments } from "@/app/hooks/comments";
import { useDeletePost, useToggleLike } from "@/app/hooks/post";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaComment, FaRegComment, FaTrash } from "react-icons/fa";
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
  const router = useRouter();

  const handleToggleLike = () => {
    if (!user) {
      router.push("/pages/signin");
    } else {
      toggleLike();
    }
  };

  return (
    <Flex justify={"flex-end"}>
      <HStack gap={"20px"} w={"full"} justify={"flex-end"}>
        <HStack spacing={"1px"}>
          <IconButton
            onClick={handleToggleLike}
            isLoading={likeLoading || userLoading}
            icon={isLiked ? <AiFillLike /> : <AiOutlineLike />}
            variant={"ghost"}
            aria-label={"like"}
            isRound
          />
          <Text>{likes?.length}</Text>
        </HStack>
        <HStack spacing={"1px"}>
          <Link href={`/pages/${link}/${post.id}`}>
            <IconButton
              aria-label="comments"
              // isLoading={commentsLoading}
              size="md"
              colorScheme="blue"
              variant="ghost"
              icon={comments?.length === 0 ? <FaRegComment /> : <FaComment />}
              isRound
            />
          </Link>
          <Text>{comments?.length}</Text>
        </HStack>
        <HStack spacing={"1px"}>
          {!userLoading &&
            user?.id === uid &&
            path.includes("/pages/profile/") && (
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
            )}
        </HStack>
      </HStack>
    </Flex>
  );
};

export default PostActions;
