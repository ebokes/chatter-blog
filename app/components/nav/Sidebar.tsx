"use client";

import { usePosts } from "@/app/hooks/post";
import { getCapitalizedName } from "@/app/utils/funcns";
import {
  Box,
  BoxProps,
  Button,
  Center,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Skeleton,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdOutlineShowChart, MdPersonOutline } from "react-icons/md";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { LinkItems } from "@/app/utils/constants";
import { useAuth, useLogout } from "../../hooks/auth";
import { auth } from "../../lib/firebase";
import Loading from "../../loader/Loading";
import DashboardWrapper from "../DashboardWrapper";
import NavMenu from "./NavMenu";
import ListSkeleton from "@/app/loader/ListSkeleton";
import SignInRequired from "../SignInRequired";

export default function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const [user, loading, error] = useAuthState(auth);

  // if (!user) return <SignInRequired />;

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
          bg={colorMode === "light" ? "brand.200" : "brand.800"}
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
  const currentRoute = usePathname();

  const categories = Array.from(new Set(posts?.map((post) => post.category)));
  const recentCategories = categories?.slice(0, 5);
  const { user: userAuth } = useAuth();

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
        <Center
          fontSize="2xl"
          fontWeight="bold"
          color={"brand.700"}
          _hover={{ textDecor: "none" }}
        >
          <Link href="/pages/feed">CHATTER</Link>
        </Center>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Stack ml={"35px"} spacing={6}>
        <Stack>
          <Text fontSize={"18px"}>Overview</Text>
          <Stack pl={"20px"} spacing={1}>
            {LinkItems.map((item) => (
              <Box
                key={item.name}
                color={currentRoute === item.href ? "white" : "default"}
                bg={currentRoute === item.href ? "brand.600" : "none"}
                py={2}
                pl={2}
                pr={4}
                borderRadius={"md"}
                width={"130px"}
                transition={"0.3s ease"}
              >
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
            {postsLoading && <ListSkeleton />}
            {recentCategories.map((item: any) => (
              <Box key={item}>
                {/* href={`/pages/categories/${posts?.id}`} */}
                <NavItem href={"/pages/dashboard"}>
                  {getCapitalizedName(item)}
                </NavItem>
              </Box>
            ))}
          </Stack>
        </Stack>
        <Stack>
          <Text fontSize={"18px"}>Personal</Text>
          <Stack pl={"20px"}>
            <Flex
              style={{ textDecoration: "none" }}
              _focus={{ boxShadow: "none" }}
            >
              <Link href={`/pages/profile/${userAuth?.id}`}>
                <Flex align="center">
                  <Icon mr="2" fontSize="16" boxSize={5} as={MdPersonOutline} />
                  <Text>Account</Text>
                </Flex>
              </Link>
            </Flex>
          </Stack>
        </Stack>
        <Flex px={0}>
          <Button
            leftIcon={<FiLogOut size={"18px"} />}
            onClick={logout}
            isLoading={isLoading}
            color={"red"}
            variant={"ghost"}
            _hover={{ variant: "ghost" }}
            _active={{ variant: "ghost" }}
          >
            Logout
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

const NavItem = ({ icon, href, key, children, ...rest }: any) => {
  return (
    <Flex style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Link href={href || "#"}>
        <Flex align="center" role="group" {...rest}>
          {icon && <Icon mr="2" fontSize="16" boxSize={5} as={icon} />}
          {children}
        </Flex>
      </Link>
    </Flex>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { colorMode } = useColorMode();

  // if (isLoading) return <div>Loading...</div>;
  return (
    <Box w={"100vw"}>
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        h={"64px"}
        alignItems="center"
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
          <NavMenu />
        </HStack>
      </Flex>
    </Box>
  );
};
