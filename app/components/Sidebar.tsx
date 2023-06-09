"use client";

import React, { ReactNode, ReactText } from "react";
import {
  IconButton,
  Avatar,
  Box,
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
} from "@chakra-ui/react";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import { IconType } from "react-icons";
import { BsLayoutWtf } from "react-icons/bs";
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
  { name: "Team blogs", icon: SlPeople, href: "" },
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
  return (
    <Box minH="100vh" bg="gray.100">
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
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    // Top navbar
    <Box
      transition="3s ease"
      bg="white"
      borderRight="1px"
      borderRightColor="gray.200"
      w={{ base: "full", md: "300px" }}
      pos="fixed"
      right={0}
      left={0}
      h="full"
      {...rest}
      overflow={"auto"}
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
              <Link
                as={NextLink}
                href={item.href}
                key={item.name}
                _hover={{ fontWeight: "semibold" }}
              >
                <HStack>
                  <NavItem icon={item.icon}>{item.name}</NavItem>
                </HStack>
              </Link>
            ))}
          </Stack>
        </Stack>
        <Stack>
          <Text fontSize={"18px"}>
            Trending Tags <Icon as={MdOutlineShowChart} />
          </Text>
          <Stack pl={"20px"} spacing={2}>
            {Tags.map((item) => (
              <Link
                as={NextLink}
                href="#"
                key={item.name}
                _hover={{ fontWeight: "semibold" }}
              >
                <HStack>
                  <NavItem icon={item.icon}>{item.name}</NavItem>
                </HStack>
              </Link>
            ))}
          </Stack>
        </Stack>
        <Stack>
          <Text fontSize={"18px"}>Personal</Text>
          <Stack pl={"20px"}>
            {Personal.map((item) => (
              <Link
                as={NextLink}
                href="#"
                key={item.name}
                textDecor={"none"}
                _hover={{ fontWeight: "semibold" }}
              >
                <HStack>
                  <NavItem icon={item.icon}>{item.name}</NavItem>
                </HStack>
              </Link>
            ))}
          </Stack>
        </Stack>
        <Link href="#" color={"red"}>
          Logout
        </Link>
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
  return (
    <Box
      w={"100vw"}
      mx={"auto"}
      // border={"1px solid red"}
    >
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg="white"
        borderBottomWidth="1px"
        borderBottomColor="gray.200"
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
        <HStack justify={"space-between"} w={"65%"} pos={"relative"}>
          <Icon
            as={MdSearch}
            pos={"absolute"}
            boxSize={"26px"}
            left={"5px"}
            opacity={0.7}
          />
          <Input
            maxW="20rem"
            placeholder="Search Chatter..."
            borderColor="gray.300"
            borderRadius="5px"
            // display={{ base: "none", md: "block" }}
            justifySelf={"flex-start"}
            pl="35px"
          />

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
                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text fontSize="sm">Justina Clark</Text>
                      <Text fontSize="xs" color="gray.600">
                        Admin
                      </Text>
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
