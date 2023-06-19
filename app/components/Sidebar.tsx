"use client";

import React, { ReactNode, ReactText, useState } from "react";
import {
  IconButton,
  Avatar,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Input,
  useColorMode,
  Button,
  Box,
} from "@chakra-ui/react";
import { FiMenu, FiBell, FiChevronDown, FiLogOut } from "react-icons/fi";
import { IconType } from "react-icons";
import { BsLayoutWtf, BsMoonStarsFill, BsSun } from "react-icons/bs";
import {
  MdOutlineBookmarks,
  MdOutlineDrafts,
  MdInsertChartOutlined,
  MdPersonOutline,
  MdNotificationsNone,
  MdOutlineShowChart,
  MdSearch,
} from "react-icons/md";
import { SlPeople } from "react-icons/sl";
import NextLink from "next/link";
import DashboardWrapper from "./DashboardWrapper";
// import { useSession, signOut } from "next-auth/react";

interface ItemProps {
  name: string;
  icon?: IconType;
  href?: string;
}

const LinkItems: Array<ItemProps> = [
  { name: "Feed", icon: BsLayoutWtf, href: "/pages/dashboard" },
  {
    name: "Bookmarks",
    icon: MdOutlineBookmarks,
    href: "/pages/dashboard/bookmarks",
  },
  { name: "Team blogs", icon: SlPeople, href: "/pages/dashboard/team-blogs" },
  { name: "Drafts", icon: MdOutlineDrafts, href: "/pages/dashboard/drafts" },
  {
    name: "Analytics",
    icon: MdInsertChartOutlined,
    href: "/pages/dashboard/analytics",
  },
];

const Tags: Array<ItemProps> = [
  { name: "Programming" },
  { name: "Data science" },
  { name: "Technology" },
  { name: "Machine learning" },
  { name: "Politics" },
];

const Personal: Array<ItemProps> = [
  { name: "Account", icon: MdPersonOutline },
  { name: "Notifications", icon: MdNotificationsNone },
];

export default function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box
        ml={{ base: 0, md: "299px" }}
        p="4"
        bg={colorMode === "light" ? "brand.300" : "brand.800"}
      >
        <DashboardWrapper>{children}</DashboardWrapper>
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { colorMode } = useColorMode();
  return (
    // Top navbar
    <Box
      transition="3s ease"
      // bg="white"
      bg={colorMode === "light" ? "white" : "dark"}
      color={colorMode === "light" ? "#171923" : "#F9FAFB"}
      borderRight="1px"
      borderRightColor={colorMode === "light" ? "brand.400" : "brand.450"}
      w={{ base: "full", md: "300px" }}
      pos="fixed"
      right={0}
      left={0}
      h="full"
      {...rest}
      overflow={"auto"}
      // zIndex={"10"}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold" color="#543EE0">
          CHATTER
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Stack ml={"55px"} spacing={6}>
        <Stack>
          <Text fontSize={"18px"}>Overview</Text>
          <Stack pl={"20px"} spacing={4}>
            {LinkItems.map((item) => (
              <Button
                variant={"ghost"}
                // as={NextLink}
                // href={item.href}
                key={item.name}
                _hover={{ fontWeight: "semibold", variant: "ghost" }}
              >
                {/* <HStack> */}
                <NavItem icon={item.icon}>{item.name}</NavItem>
                {/* </HStack> */}
              </Button>
            ))}
          </Stack>
        </Stack>
        <Stack>
          <Text fontSize={"18px"}>
            Trending Tags <Icon as={MdOutlineShowChart} />
          </Text>
          <Stack pl={"20px"} spacing={2}>
            {Tags.map((item) => (
              <Button
                variant={"ghost"}
                // as={NextLink}
                // href="/fix"
                key={item.name}
                _hover={{ fontWeight: "semibold", variant: "ghost" }}
              >
                {/* <Box> */}
                <NavItem icon={item.icon}>{item.name}</NavItem>
                {/* </Box> */}
              </Button>
            ))}
          </Stack>
        </Stack>
        <Stack>
          <Text fontSize={"18px"}>Personal</Text>
          <Stack pl={"20px"}>
            {Personal.map((item) => (
              <Button
                variant={"ghost"}
                // as={NextLink}
                // href="/fix"
                key={item.name}
                textDecor={"none"}
                _hover={{ fontWeight: "semibold", variant: "ghost" }}
              >
                {/* <Box> */}
                <NavItem icon={item.icon}>{item.name}</NavItem>
                {/* </Box> */}
              </Button>
            ))}
          </Stack>
        </Stack>
        <HStack color={"red"}>
          <Text>Logout</Text>
          <FiLogOut size={"18px"} />
        </HStack>
      </Stack>
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }: any) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" boxSize={5} as={icon} />}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  // const { data: session } = useSession();
  // const session = useSession();
  const { colorMode, toggleColorMode } = useColorMode();
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);
  return (
    <Box
      w={"97.5vw"}
      ml={"auto"}
      // mx={"auto"}
      // border={"1px solid red"}
      // zIndex={"5"}
    >
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        // bg="white"
        bg={colorMode === "light" ? "white" : "dark"}
        color={colorMode === "light" ? "brand.800" : "brand.300"}
        borderBottomWidth="1px"
        borderBottomColor={colorMode === "light" ? "brand.400" : "brand.450"}
        justifyContent={{ base: "space-between", md: "flex-end" }}
        {...rest}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
        <IconButton
          onClick={handleToggle}
          icon={<MdSearch />}
          aria-label="Search"
        />
        <HStack justify={"space-between"} w={"65%"} pos={"relative"}>
          {show && (
            <Icon
              as={MdSearch}
              pos={"absolute"}
              boxSize={"26px"}
              left={"5px"}
              opacity={0.7}
            />
          )}
          <Input
            maxW="20rem"
            placeholder="Search Chatter..."
            borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
            borderRadius="5px"
            // display={{ base: "none", md: "block" }}
            justifySelf={"flex-start"}
            pl="35px"
          />
          <Button
            aria-label="Toggle Color Mode"
            onClick={toggleColorMode}
            mr={5}
            _focus={{ boxShadow: "none" }}
            w="fit-content"
            variant={"ghost"}
            _hover={{ variant: "ghost" }}
            _active={{ variant: "ghost" }}
          >
            {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
          </Button>
          <HStack spacing={{ base: "0", md: "6" }}>
            <IconButton
              size="lg"
              variant="ghost"
              aria-label="open menu"
              icon={<FiBell />}
            />
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  py={2}
                  transition="all 0.3s"
                  _focus={{ boxShadow: "none" }}
                >
                  <HStack>
                    <Avatar size={"sm"} src="/alex.webp" />
                    {/* <Text>{session?.data?.user?.email}</Text> */}
                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text fontSize="sm">Justina Clark</Text>
                      {/* <Text fontSize="xs" color="gray.600">
                        Admin
                      </Text> */}
                    </VStack>
                    <Box display={{ base: "none", md: "flex" }}>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList bg="white" borderColor="gray.200">
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem>Billing</MenuItem>
                  <MenuDivider />
                  <MenuItem>Sign out</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};
