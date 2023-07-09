"use client";

import { usePosts } from "@/app/hooks/post";
import {
  Box,
  BoxProps,
  Button,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Input,
  Link,
  Skeleton,
  Stack,
  Text,
  useColorMode,
  useDisclosure
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactNode, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { IconType } from "react-icons";
import { BsLayoutWtf, BsMoonStarsFill, BsSun } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { FiLogOut, FiMenu } from "react-icons/fi";
import {
  MdInsertChartOutlined,
  MdNotificationsNone,
  MdOutlineBookmarks,
  MdOutlineDrafts,
  MdOutlineShowChart,
  MdPersonOutline,
  MdSearch,
} from "react-icons/md";
import { SlPeople } from "react-icons/sl";
import { useLogout } from "../../hooks/auth";
import { auth } from "../../lib/firebase";
import Loading from "../../loader/Loading";
import DashboardWrapper from "../DashboardWrapper";
import NavMenu from "./NavMenu";

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

const Personal: Array<ItemProps> = [
  { name: "Account", icon: MdPersonOutline },
  { name: "Notifications", icon: MdNotificationsNone },
];

export default function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const [user, loading, error] = useAuthState(auth);

  if (error) return <Text>Oops, something went wrong</Text>;
  if (loading) return <Loading />;

  if (user) {
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
          ml={{ base: 0, md: "241px" }}
          p={{ base: "0", sm: "4" }}
          bg={colorMode === "light" ? "brand.300" : "brand.800"}
        >
          <DashboardWrapper>{children}</DashboardWrapper>
        </Box>
      </Box>
    );
  }
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { colorMode } = useColorMode();
  const { logout, isLoading } = useLogout();
  const { posts, isLoading: postsLoading } = usePosts();
  const categories = Array.from(new Set(posts?.map((post) => post.category)));
  const recentCategories = categories?.slice(0, 5);

  return (
    // Top navbar
    <Box
      transition="3s ease"
      // bg="transparent"
      bg={colorMode === "light" ? "white" : "dark"}
      color={colorMode === "light" ? "#171923" : "#F9FAFB"}
      borderRight="1px"
      borderRightColor={colorMode === "light" ? "brand.400" : "brand.450"}
      w={{ base: "full", md: "240px" }}
      // w="230px"
      pos="fixed"
      right={0}
      left={0}
      h="full"
      {...rest}
      overflow={"auto"}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        {/* <Box
          fontSize="2xl"
          fontWeight="bold"
          color="#543EE0"
          sx={{ textDecoration: "none" }}
        > */}
        <Link
          as={NextLink}
          href="/pages/feed"
          fontSize="2xl"
          fontWeight="bold"
          // color="#543EE0"
          color={"brand.700"}
          _hover={{ textDecor: "none" }}
        >
          CHATTER
        </Link>
        {/* </Box> */}
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Stack ml={"35px"} spacing={6}>
        <Stack>
          <Text fontSize={"18px"}>Overview</Text>
          <Stack pl={"20px"} spacing={4}>
            {LinkItems.map((item) => (
              <Box key={item.name}>
                <NavItem icon={item.icon} href={item.href}>
                  {item.name}
                </NavItem>
              </Box>
            ))}
          </Stack>
        </Stack>
        <Stack>
          <Text fontSize={"18px"}>
            Trending Tags <Icon as={MdOutlineShowChart} />
          </Text>
          <Stack pl={"20px"} spacing={"10px"}>
            {postsLoading && (
              <Stack spacing={3}>
                <Skeleton height="15px" w={"100px"} />
                <Skeleton height="15px" w={"100px"} />
                <Skeleton height="15px" w={"100px"} />
                <Skeleton height="15px" w={"100px"} />
                <Skeleton height="15px" w={"100px"} />
              </Stack>
            )}
            {recentCategories.map((item: any) => (
              <Box key={item}>
                {/* href={`/pages/categories/${posts?.id}`} */}
                <NavItem>{item}</NavItem>
              </Box>
            ))}
          </Stack>
        </Stack>
        <Stack>
          <Text fontSize={"18px"}>Personal</Text>
          <Stack pl={"20px"}>
            {Personal.map((item) => (
              <Box key={item.name}>
                <NavItem icon={item.icon}>{item.name}</NavItem>
              </Box>
            ))}
          </Stack>
        </Stack>
        {/* <HStack color={"red"} onClick={Logout} cursor={"pointer"}>
          <Text>Logout</Text>
          <FiLogOut size={"18px"} />
        </HStack> */}
        <Stack pl={"20px"}>
          <Button
            leftIcon={<FiLogOut size={"18px"} />}
            onClick={logout}
            isLoading={isLoading}
            color={"red"}
            variant={"ghost"}
            _hover={{ variant: "ghost" }}
            _active={{ variant: "ghost" }}
            w={"30px"}
          >
            Logout
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

const NavItem = ({ icon, href, key, children, ...rest }: any) => {
  return (
    <Link
      as={NextLink}
      href={href || "#"}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        // mx="4px"
        // borderRadius="lg"
        role="group"
        // cursor="pointer"
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
  const { colorMode, toggleColorMode } = useColorMode();
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);
  // if (isLoading) return <div>Loading...</div>;
  return (
    <Box
      w={"100vw"}
      // ml={"auto"}
      // mx={"auto"}
      // border={"1px solid red"}
      // zIndex={"5"}
    >
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        // height="20"
        h={"64px"}
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

        <HStack justify={"flex-end"} w={"90%"} pos={"relative"}>
          {show && (
            <>
              {/* <Icon
                as={MdSearch}
                pos={"absolute"}
                boxSize={"26px"}
                left={"5px"}
                opacity={0.7}
              /> */}

              <Input
                maxW="20rem"
                placeholder="Search Chatter..."
                borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
                borderRadius="5px"
                // display={{ base: "none", md: "block" }}
                justifySelf={"flex-start"}
                // pl="35px"
              />
            </>
          )}

          <HStack
            as={Link}
            href={"/pages/dashboard/write"}
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
          >
            <Icon as={CiEdit} boxSize={"20px"} />
            <Text display={{ base: "none", md: "inline" }}>Write</Text>
          </HStack>
          <HStack>
            <IconButton
              onClick={handleToggle}
              icon={<MdSearch />}
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
          <NavMenu />
        </HStack>
      </Flex>
    </Box>
  );
};
