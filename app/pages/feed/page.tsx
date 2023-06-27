"use client";

import Navbar from "@/app/components/Navbar";
import Post from "@/app/components/Post";
import Recommendation from "@/app/components/Rightbar";
import { ChatterContext } from "@/app/context/ChatterContext";
import { useAuth } from "@/app/hooks/auth";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import { useContext, useState } from "react";
import { IconType } from "react-icons";
import { BsBookmarkCheckFill, BsBookmarkPlus } from "react-icons/bs";
import { VscBook } from "react-icons/vsc";

interface PostDetailProps {
  avatar: string;
  name: string;
  role: string;
  date: string;
  title: string;
  readTime: string;
  intro: string;
  bannerUrl: string;
  alt: string;
  bookmarked: boolean;
  tags: string[];
  footer?: {
    icon: IconType;
    count?: number;
  }[];
}

const Feed = () => {
  const { posts } = useContext(ChatterContext);
  const { colorMode } = useColorMode();
  // const { user, isLoading } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };
  return (
    <>
      <Recommendation>
        <Box>
          <Flex align={"flex-end"} justify={"space-between"} my={5}></Flex>

          <Box>
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </Box>
          {/* </Box> */}
        </Box>
      </Recommendation>
    </>
  );
};

export default Feed;
