"use client";

import { useAuth } from "@/app/hooks/auth";
import { useComments } from "@/app/hooks/comments";
import { useDeleteDraft, useDeletePost, useToggleLike } from "@/app/hooks/post";
import { getCapitalizedName } from "@/app/utils/funcns";
import { Flex, HStack, IconButton, Text, Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaComment, FaRegComment } from "react-icons/fa";
import CategoryBtn from "../CategoryBtn";
import { useToggleBookmark } from "@/app/hooks/bookmarks";
import {
  BsBookmarkPlus,
  BsFillBookmarkCheckFill,
  BsTrash,
} from "react-icons/bs";
import { LuEdit } from "react-icons/lu";

const PostActions = ({ post, link }: any) => {
  const { likes, id, uid, bookmarks } = post;
  const { user, isLoading: userLoading } = useAuth();
  const isLiked = likes?.includes(user?.id);
  const isBookmarked = bookmarks?.includes(user?.id);
  const config = { id, isLiked, uid: user?.id, isBookmarked };
  const { toggleLike, isLoading: likeLoading } = useToggleLike(config);
  const { deletePost, isLoading: deleteLoading } = useDeletePost(id);
  const { deleteDraft, isLoading: draftLoading } = useDeleteDraft(id);
  const { comments } = useComments(id);
  const { toggleBookmark, isLoading: bookmarkLoading } =
    useToggleBookmark(config);
  const path = usePathname();
  const router = useRouter();

  const handleToggleLike = () => {
    if (!user) {
      router.push("/pages/signin");
    } else {
      toggleLike();
    }
  };
  const handleToggleBookmark = () => {
    if (!user) {
      router.push("/pages/signin");
    } else {
      toggleBookmark();
    }
  };

  const deleteDraftPost = () => {
    path.includes("drafts") ? deleteDraft() : deletePost();
  };

  return (
    <Flex justify={"space-between"}>
      <Link href={`/pages/categories/${post?.category}`}>
        <CategoryBtn>{getCapitalizedName(post?.category)}</CategoryBtn>
      </Link>
      <HStack w={"full"} justify={"flex-end"}>
        <HStack
          spacing={"1px"}
          hidden={path.includes("pages/dashboard/drafts")}
          mr={"10px"}
        >
          <Tooltip label="Like" aria-label="Like" hasArrow>
            <IconButton
              onClick={handleToggleLike}
              isLoading={likeLoading || userLoading}
              icon={isLiked ? <AiFillLike /> : <AiOutlineLike />}
              variant={"ghost"}
              aria-label={"like"}
              isRound
            />
          </Tooltip>
          <Text>{likes?.length}</Text>
        </HStack>
        <HStack
          mr={"10px"}
          spacing={"1px"}
          hidden={path.includes("pages/dashboard/drafts")}
        >
          <Tooltip label="Comment" aria-label="Comment" hasArrow>
            <Link href={`/pages/${link}/${post.id}`}>
              <IconButton
                aria-label="comments"
                size="md"
                colorScheme="blue"
                variant="ghost"
                icon={comments?.length === 0 ? <FaRegComment /> : <FaComment />}
                isRound
              />
            </Link>
          </Tooltip>
          <Text>{comments?.length}</Text>
        </HStack>
        <HStack hidden={!path.includes("pages/dashboard/drafts")}>
          <Tooltip label="Edit post" aria-label="Edit post" hasArrow>
            <IconButton
              aria-label="edit"
              icon={<LuEdit />}
              size="md"
              colorScheme="blue"
              variant="ghost"
              isRound
              isDisabled
            />
          </Tooltip>
        </HStack>
        {!userLoading &&
          user?.id === uid &&
          (path.includes("/pages/profile/") ||
            path.includes("pages/dashboard/drafts")) && (
            <HStack spacing={"1px"}>
              <Tooltip label="Delete post" aria-label="Delete post" hasArrow>
                <IconButton
                  ml="auto"
                  aria-label="delete post"
                  onClick={deleteDraftPost}
                  isLoading={deleteLoading || draftLoading}
                  size="md"
                  colorScheme="red"
                  variant="ghost"
                  icon={<BsTrash />}
                  isRound
                />
              </Tooltip>
            </HStack>
          )}

        <HStack
          hidden={
            path.includes("pages/dashboard/drafts") ||
            path.includes("/pages/profile/")
          }
        >
          <Tooltip label="Bookmark" aria-label="Bookmark" hasArrow>
            <IconButton
              onClick={handleToggleBookmark}
              isLoading={bookmarkLoading || userLoading}
              icon={
                isBookmarked ? <BsFillBookmarkCheckFill /> : <BsBookmarkPlus />
              }
              variant={"ghost"}
              colorScheme="blue"
              aria-label={"bookmark"}
              isRound
            />
          </Tooltip>
          <Text>{bookmarks?.length ?? 0} </Text>
        </HStack>
      </HStack>
    </Flex>
  );
};

export default PostActions;
