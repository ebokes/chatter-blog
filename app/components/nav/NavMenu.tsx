import {
  HStack,
  Flex,
  Menu,
  MenuButton,
  //   Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorMode,
  SkeletonCircle,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
// import { useAuth, useLogout } from "../hooks/auth";
import NextLink from "next/link";
import Link from "next/link";
import { useAuth, useLogout } from "@/app/hooks/auth";
import Avatar from "../Avatar";
// import Avatar from "./Avatar";

const NavMenu = () => {
  const { colorMode } = useColorMode();
  const { user, isLoading } = useAuth();
  const { logout } = useLogout();

  if (!user) return <div>Loading...</div>;

  return (
    <HStack spacing={{ base: "0", md: "6" }}>
      <Flex alignItems={"center"}>
        <Menu>
          <MenuButton
            py={2}
            transition="all 0.3s"
            _focus={{ boxShadow: "none" }}
          >
            <HStack w={"32px"}>
              {isLoading ? (
                <SkeletonCircle size="32px" />
              ) : (
                // <Avatar
                //   size={"sm"}
                //   name={user?.firstName + " " + user?.lastName}
                //   src={user?.avatar}
                // />
                <Avatar user={user} size="sm" />
              )}
            </HStack>
          </MenuButton>
          <MenuList bg={colorMode === "light" ? "brand.300" : "brand.950"}>
            <MenuItem as={NextLink} href={`/pages/profile/${user?.id}`}>
              {user?.displayName}
            </MenuItem>

            {/* <MenuDivider /> */}
            <MenuItem as={Link} href={"/pages/dashboard"}>
              Dashboard
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={logout}>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  );
};

export default NavMenu;
