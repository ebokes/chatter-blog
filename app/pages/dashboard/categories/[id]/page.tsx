"use client";

import PostList from "@/app/components/posts/PostList";
import { usePostCategory } from "@/app/hooks/post";
import { getCapitalizedName } from "@/app/utils/funcns";
import { useParams } from "next/navigation";
import React from "react";

const CategoryList = () => {
  const { id } = useParams();
  const { postCategory, isLoading } = usePostCategory(id);

  return (
    <PostList
      isLoading={isLoading}
      posts={postCategory}
      link={"dashboard"}
      title={getCapitalizedName(id)}
    />
  );
};

export default CategoryList;
