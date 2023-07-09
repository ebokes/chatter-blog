"use client";

import {
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";
import { useAuth } from "@/app/hooks/auth";
import NavMenu from "./NavMenu";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, isLoading, error } = useAuth();
  const path = usePathname();

  return (
    <Box
      width="full"
      bg={colorMode === "light" ? "brand.300" : "brand.800"}
      borderBottom={"1px solid"}
      borderBottomColor={colorMode === "light" ? "brand.400" : "brand.450"}
    >
      <Flex
        color={colorMode === "light" ? "brand.800" : "brand.300"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 2, sm: 6 }}
        align={"center"}
        maxW={"1200px"}
        mx={"auto"}
      >
        <Flex
          // flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "flex-start" }}>
          <Link
            as={NextLink}
            href="/"
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color="brand.600"
            fontWeight={"bold"}
            _hover={{ textDecoration: "none" }}
          >
            CHATTER
          </Link>

          {/* {!path.includes("signup") ||
            (!path.includes("signup") && ( */}
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
          {/* ))} */}
        </Flex>

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
        {/* {!path.includes("signup") ||
          (!path.includes("signup") && (
            <> */}
        {isLoading ? null : (
          <>
            {!user ? (
              <Stack
                flex={{ base: 1, md: 0 }}
                justify={"flex-end"}
                direction={"row"}
                spacing={6}
              >
                <Button
                  as={NextLink}
                  fontSize={"sm"}
                  fontWeight={600}
                  variant={"link"}
                  href={"/pages/signin"}
                  px={"15px"}
                  py={"7px"}
                  color={"brand.600"}
                  border={"1px solid"}
                  borderColor={"brand.600"}
                  _hover={{
                    bg: "brand.700",
                    color: "white",
                  }}
                >
                  Sign In
                </Button>
                <Button
                  as={NextLink}
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"brand.600"}
                  href={"/pages/signup"}
                  _hover={{
                    bg: "brand.700",
                  }}
                >
                  Sign Up
                </Button>
              </Stack>
            ) : (
              <NavMenu />
            )}
          </>
        )}
        {/* </>
          ))} */}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const { colorMode } = useColorMode();
  const currentRoute = usePathname();
  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                borderRadius={"xl"}
                // border={"2px solid"}
                border={
                  currentRoute === navItem.href ? "2px solid" : "0px solid"
                }
                borderColor={
                  currentRoute === navItem.href ? "brand.650" : "transparent"
                }
                _hover={{ color: "brand.700" }}
                _active={{ color: "brand.600" }}
                fontSize={"sm"}
                fontWeight={500}
                // color={"gray.600"}
                color={colorMode === "light" ? "brand.800" : "gray.400"}
                // _hover={{
                //   textDecoration: "none",
                //   // color: "gray.800",
                //   color: colorMode === "light" ? "brand.800" : "gray.200",
                // }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={"white"}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      as={NextLink}
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: "brand.700" }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "brand.700" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"brand.600"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  const { colorMode } = useColorMode();
  return (
    <Stack
      p={4}
      display={{ md: "none" }}
      bg={colorMode === "light" ? "brand.100" : "brand.800"}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={colorMode === "light" ? "brand.800" : "gray.400"}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor="gray.200"
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Feed",
    href: "/pages/feed",
    // children: [
    //   {
    //     label: "Explore Design Work",
    //     subLabel: "Trending Design to inspire you",
    //     href: "#",
    //   },
    //   {
    //     label: "New & Noteworthy",
    //     subLabel: "Up-and-coming Designers",
    //     href: "#",
    //   },
    // ],
  },
  {
    label: "About us",
    href: "/pages/about-us",
    // children: [
    //   {
    //     label: "Job Board",
    //     subLabel: "Find your dream design job",
    //     href: "#",
    //   },
    //   {
    //     label: "Freelance Projects",
    //     subLabel: "An exclusive list for contract work",
    //     href: "#",
    //   },
    // ],
  },
  {
    label: "Contact",
    href: "#",
  },
  {
    label: "Blog",
    href: "#",
  },
];
