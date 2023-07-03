"use client";

// import NewComment from "@/app/components/NewComment";
import { Box, Heading } from "@chakra-ui/react";
// import { PostProps, usePost } from "../hooks/post";
import { PostProps } from "@/app/hooks/post";
import CommentList from "./CommentList";
import NewComment from "./NewComment";

const Comments = ({ post }: { post: PostProps }) => {
  // const params = useParams();
  // const { id } = params;
  // const { post, isLoading: postLoading } = usePost(id);
  // console.log(post, " <== Post");

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

export default Comments;
