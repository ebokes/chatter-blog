import { useAuth, useLogout } from "@/app/hooks/auth";
import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  SkeletonCircle,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { default as Link } from "next/link";
import { useState } from "react";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { FiChevronDown } from "react-icons/fi";
import { MdSearch } from "react-icons/md";
import Avatar from "../Avatar";
import Search from "../Search";
import NavMenuSkeleton from "@/app/loader/NavMenuSkeleton";

const NavMenu = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, isLoading } = useAuth();
  const { logout } = useLogout();
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  if (!user || isLoading) return <NavMenuSkeleton />;

  return (
    <>
      {show && (
        <Box mr={"9px"}>
          <Search />
        </Box>
      )}
      <HStack
        borderRadius={"30px"}
        pr={"10px"}
        bg={"brand.600"}
        px={"10px"}
        py={"7px"}
        fontWeight={"semibold"}
        color={colorMode === "light" ? "brand.100" : "brand.100"}
        _hover={{
          bg: "brand.700",
          textDecoration: "none",
        }}
        mr={2}
      >
        <Link href={"/pages/dashboard/write"}>
          <HStack>
            <Icon as={CiEdit} boxSize={"20px"} />
            <Text display={{ base: "none", md: "inline" }}>Write</Text>
          </HStack>
        </Link>
      </HStack>
      <HStack mr={2}>
        <IconButton
          onClick={handleToggle}
          icon={<MdSearch size={"20px"} />}
          aria-label="Toggle Search Bar"
          variant={"ghost"}
          _hover={{ variant: "ghost" }}
        />
        <IconButton
          aria-label="Toggle Color Mode"
          onClick={toggleColorMode}
          variant={"ghost"}
          _hover={{ variant: "ghost" }}
          icon={colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
        />
      </HStack>
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
    </>
  );
};

export default NavMenu;
