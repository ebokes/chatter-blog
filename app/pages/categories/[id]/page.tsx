"use client";

import Rightbar from "@/app/components/nav/Rightbar";
import PostList from "@/app/components/posts/PostList";
import { usePostCategory } from "@/app/hooks/post";
import { getCapitalizedName } from "@/app/utils/funcns";
import { useParams } from "next/navigation";
import React from "react";

const CategoryList = () => {
  const { id } = useParams();
  const { postCategory, isLoading } = usePostCategory(id);

  return (
    <Rightbar>
      <PostList
        posts={postCategory}
        link={"feed"}
        title={getCapitalizedName(id)}
      />
    </Rightbar>
  );
};

export default CategoryList;
