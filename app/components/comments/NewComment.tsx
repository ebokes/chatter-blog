"use client";

import { useAuth } from "@/app/hooks/auth";
import { useAddComment } from "@/app/hooks/comments";
import { PostProps } from "@/app/hooks/post";
import { Box, Button, Flex, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import TextareaAutoSize from "react-textarea-autosize";
import Avatar from "../Avatar";
import Link from "next/link";

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
  const router = useRouter();

  const handleAddComment = (data: any) => {
    if (!user) {
      router.push("/pages/signin");
    } else {
      addComment(data.text);
      reset();
    }
  };
  // console.log(data);

  if (authLoading || !user)
    return (
      <Box>
        You must&nbsp;
        <Box fontWeight={"bold"} color={"brand.600"}>
          <Link href="/pages/signin">Signin</Link>
        </Box>
        &nbsp;to comment
      </Box>
    );

  return (
    <Flex gap={"10px"}>
      <Avatar user={user} size="sm" />
      <Box w={"full"}>
        <form onSubmit={handleSubmit(handleAddComment)} className="form">
          <Box>
            <Textarea
              as={TextareaAutoSize}
              resize="none"
              placeholder="Add to the discussion"
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
              colorScheme="blue"
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Flex>
  );
};

export default NewComment;
