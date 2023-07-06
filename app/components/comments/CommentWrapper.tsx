"use client";

import { Box, Heading } from "@chakra-ui/react";
import { PostProps } from "@/app/hooks/post";
import CommentList from "./CommentList";
import NewComment from "./NewComment";

const CommentWrapper = ({ post }: { post: PostProps }) => {
  return (
    <>
      <Box my={"30px"}>
        <Heading fontSize={"3xl"} mb={"34px"}>
          Comments
        </Heading>
        {post ? <NewComment post={post} /> : null}
        {post ? <CommentList post={post} /> : null}
      </Box>
    </>
  );
};

export default CommentWrapper;
