import {
  Box,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  SkeletonCircle,
  Text,
  useColorMode,
} from "@chakra-ui/react";
// import { useAuth, useLogout } from "../hooks/auth";
import { useAuth, useLogout } from "@/app/hooks/auth";
import { default as Link, default as NextLink } from "next/link";
import { FiChevronDown } from "react-icons/fi";
import Avatar from "../Avatar";

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
            <MenuItem>
              <Link href={`/pages/profile/${user?.id}`}>
                <Box>
                  <Text fontWeight={"bold"}>{user?.displayName}</Text>
                  <Text>{user?.email}</Text>
                </Box>
              </Link>
            </MenuItem>

            <MenuDivider />
            <Link href={"/pages/dashboard"}>
              <MenuItem>Dashboard</MenuItem>
            </Link>
            <MenuDivider />
            <MenuItem onClick={logout}>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  );
};

export default NavMenu;
