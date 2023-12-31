"use client";

import { Avatar as ChakraAvatar, SkeletonCircle } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";

interface AvatarProps {
  user: {
    displayName?: string;
    avatar?: string;
    id?: string;
  };
  size?: string;
}

const Avatar: React.FC<AvatarProps> = ({ user, size }) => {
  if (!user) {
    return null; // Return early if user is null
  }
  return (
    <ChakraAvatar
      name={user?.displayName}
      as={Link}
      href={`/pages/profile/${user?.id}`}
      size={size}
      src={user?.avatar}
      _hover={{ cursor: "pointer", opacity: "0.8" }}
    />
  );
};

export default Avatar;
