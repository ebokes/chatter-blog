"use client";

import Post from "@/app/components/posts/Post";
import Rightbar from "@/app/components/nav/Rightbar";

const GenPostWrapper = () => {
  return (
    <>
      <Rightbar>
        <Post />
      </Rightbar>
    </>
  );
};

export default GenPostWrapper;
