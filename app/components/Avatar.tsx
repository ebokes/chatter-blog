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
  //   if (!user) return <SkeletonCircle size="10" />;
  if (!user) {
    return null; // Return early if user is null
  }
  return (
    <ChakraAvatar
      name={user?.displayName}
      as={Link}
      size={size}
      src={user?.avatar}
      _hover={{ cursor: "pointer", opacity: "0.8" }}
      href={`/dashboard/profile/${user?.id}`}
    />
  );
};

export default Avatar;
