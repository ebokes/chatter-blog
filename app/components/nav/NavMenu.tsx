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
  Icon,
  Box,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
// import { useAuth, useLogout } from "../hooks/auth";
import NextLink from "next/link";
import Link from "next/link";
import { useAuth, useLogout } from "@/app/hooks/auth";
import Avatar from "../Avatar";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FiChevronDown } from "react-icons/fi";
// import Avatar from "./Avatar";

const NavMenu = () => {
  const { colorMode } = useColorMode();
  const { user, isLoading } = useAuth();
  const { logout } = useLogout();

  if (!user) return <div></div>;

  return (
    <HStack spacing={{ base: "0", md: "6" }}>
      <Flex alignItems={"center"}>
        <Menu>
          <MenuButton
            py={2}
            transition="all 0.3s"
            _focus={{ boxShadow: "none" }}
          >
            <HStack>
              <Box w={"32px"}>
                {isLoading ? (
                  <SkeletonCircle size="32px" />
                ) : (
                  <Avatar user={user} size="sm" />
                )}
              </Box>
              {/* <Icon as={ChevronDownIcon} /> */}
              <Box display={{ base: "none", md: "flex" }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList bg={colorMode === "light" ? "brand.300" : "brand.950"}>
            <MenuItem as={NextLink} href={`/pages/profile/${user?.id}`}>
              <Box>
                <Text fontWeight={"bold"}>{user?.displayName}</Text>
                <Text>{user?.email}</Text>
              </Box>
            </MenuItem>

            <MenuDivider />
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
