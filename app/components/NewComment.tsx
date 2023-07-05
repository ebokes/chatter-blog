"use client";

import { useAuth } from "@/app/hooks/auth";
import { useAddComment } from "@/app/hooks/comments";
import { PostProps } from "@/app/hooks/post";
import { Box, Button, Flex, Input, Textarea, VStack } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
// import { useAuth } from "../hooks/auth";
// import { PostProps } from "../hooks/post";
// import Avatar from "./Avatar";
// import { useAddComment } from "../hooks/comments";
import TextareaAutoSize from "react-textarea-autosize";
import Avatar from "./Avatar";
// import Avatar from "../Avatar";

interface NewCommentProps {
  post: PostProps;
}

const NewComment: React.FC<NewCommentProps> = ({ post }) => {
  const postID = post.id || "";
  const { user, isLoading: authLoading } = useAuth();
  const { addComment, isLoading: commentLoading } = useAddComment({
    postID,
    uid: user?.id || "",
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddComment = (data: any) => {
    addComment(data.text);
    reset();
  };
  // console.log(data);

  if (authLoading || !user) return <div>Loading...</div>;

  return (
    <Flex gap={"10px"}>
      {/* <Avatar name="Chibuokem Egbuchulam" /> */}
      {/* <Flex flex={0.1}> */}
      <Avatar user={user} />
      {/* </Flex> */}
      {/* <Flex flex={0.9}> */}
      <form onSubmit={handleSubmit(handleAddComment)} className="form">
        <Box>
          <Textarea
            as={TextareaAutoSize}
            resize="none"
            placeholder="Add to the discussion"
            // flex={0.8}
            w={"full"}
            size={"xl"}
            autoComplete="off"
            minRows={3}
            borderRadius={"md"}
            px={3}
            {...register("text", { required: true })}
          />
          <Button
            mt={2}
            justifySelf={"flex-end"}
            isLoading={commentLoading || authLoading}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
      {/* </Flex> */}
    </Flex>
  );
};

export default NewComment;
