import React from "react";
import { PostProps } from "../hooks/post";
import { useComments } from "../hooks/comments";

interface CommentListProps {
  post: PostProps;
}

const CommentList: React.FC<CommentListProps> = ({ post }) => {
  const { id } = post;
  const { comments, isLoading } = useComments(id?.toString() || "");

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {comments?.map((comment) => (
        <div key={comment.id}>{comment.text}</div>
      ))}
    </>
  );
};

export default CommentList;
