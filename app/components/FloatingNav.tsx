"use client";

import {
  Box,
  Center,
  Divider,
  Flex,
  IconButton,
  Text,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment, FaRegBookmark } from "react-icons/fa";
import { FiLink, FiMessageSquare, FiBookmark } from "react-icons/fi";
import { useAuth } from "../hooks/auth";
import { useComments } from "../hooks/comments";
import { usePost, usePostsUid, useToggleLike } from "../hooks/post";
import { useParams } from "next/navigation";

export const FloatingNav = () => {
  const { colorMode } = useColorMode();
  const { id: postId } = useParams();
  const { post, isLoading: postLoading } = usePost(postId);
  const { user, isLoading: userLoading } = useAuth();
  const isLiked = post?.likes?.includes(user?.id);
  //   const config = { postId, isLiked, uid: user?.id };
  // const { toggleLike, isLoading: likeLoading } = useToggleLike(postId, isLiked, uid: user?.id);
  //   const { comments } = useComments(id);
  //   console.log(config);
  console.log(user?.id);
  // const { likes, id, uid } = post;
  //   console.log(post?.likes);

  if (postLoading || userLoading || !user) {
    return null;
  }

  return (
    <Center w={"full"}>
      <Flex
        border={"1px solid"}
        borderColor={colorMode === "light" ? "brand.430" : "brand.410"}
        px={"10px"}
        w={"fit-content"}
        borderRadius={"40px"}
        h={"fit-content"}
        pos={"fixed"}
        bottom={"40px"}
        bg={colorMode === "light" ? "brand.100" : "brand.460"}
        boxShadow={"xl"}
        align={"center"}
      >
        <Tooltip label="Like">
          <IconButton
            // onClick={handleToggleLike}
            // isLoading={likeLoading || userLoading}
            // icon={isLiked ? <AiFillLike /> : <AiOutlineLike />}
            size={"lg"}
            // icon={<AiOutlineLike size={"25px"} />}
            // onClick={toggleLike}
            // isLoading={likeLoading || userLoading}
            icon={isLiked ? <AiFillLike /> : <AiOutlineLike />}
            variant={"ghost"}
            aria-label={"like"}
            isRound
            color={colorMode === "light" ? "brand.850" : "brand.200"}
          />
        </Tooltip>
        <Text>{post?.likes?.length}</Text>
        <Divider
          orientation="vertical"
          height="20px"
          mx={4}
          borderColor={colorMode === "light" ? "brand.430" : "brand.410"}
        />
        <Tooltip label="Comments">
          <IconButton
            aria-label="comments"
            size="lg"
            // colorScheme="blue"
            variant="ghost"
            // icon={comments?.length === 0 ? <FaRegComment /> : <FaComment />}
            icon={<FaRegComment size={"20px"} />}
            isRound
          />
        </Tooltip>
        <Text>19</Text>
        <Divider
          orientation="vertical"
          height="20px"
          mx={4}
          borderColor={colorMode === "light" ? "brand.430" : "brand.410"}
        />
        <Tooltip label="Bookmark">
          <IconButton
            aria-label="bookmark"
            icon={<FaRegBookmark />}
            size="lg"
            variant="ghost"
            isRound
          />
        </Tooltip>
      </Flex>
    </Center>
  );
};
