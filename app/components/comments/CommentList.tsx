"use client";

import React from "react";
// import { PostProps } from "../hooks/post";
// import { useComments } from "../hooks/comments";
import Comment from "./Comment";
import { Stack } from "@chakra-ui/react";
import { PostProps } from "@/app/hooks/post";
import { useComments } from "@/app/hooks/comments";

interface CommentListProps {
  post: PostProps;
}

const CommentList: React.FC<CommentListProps> = ({ post }) => {
  const { id } = post;
  const { comments, isLoading } = useComments(id?.toString() || "");

  if (isLoading) return <div>Loading...</div>;

  return (
    <Stack spacing={8} mt={"35px"} ml={"55px"}>
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Stack>
  );
};

export default CommentList;
