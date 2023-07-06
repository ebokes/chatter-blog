"use client";

import Post from "@/app/components/Post";
import Recommendation from "@/app/components/Rightbar";

const GenPostWrapper = () => {
  return (
    <>
      <Recommendation>
        <Post />
      </Recommendation>
    </>
  );
};

export default GenPostWrapper;
