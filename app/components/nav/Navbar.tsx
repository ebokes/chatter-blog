"use client";

import { ChevronRightIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";
import { useAuth } from "@/app/hooks/auth";
import NavMenu from "./NavMenu";
import { useState } from "react";
import { MdSearch } from "react-icons/md";
import Search from "../Search";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, isLoading, error } = useAuth();
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Box
      width="full"
      bg={colorMode === "light" ? "brand.300" : "brand.800"}
      borderBottom={"1px solid"}
      borderBottomColor={colorMode === "light" ? "brand.400" : "#2D3748"}
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
        <Flex ml={{ base: -2 }} display={{ base: "flex", md: "none" }}>
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
          <Center
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color="brand.600"
            fontWeight={"bold"}
            display={{ base: "none", sm: "flex" }}
            _hover={{ textDecoration: "none" }}
          >
            <Link href="/">CHATTER</Link>
          </Center>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        {isLoading ? null : (
          <>
            <>
              {show && (
                <Box mr={{ base: "1px", md: "9px" }}>
                  <Search />
                </Box>
              )}
            </>
            {!user ? (
              <Stack
                flex={{ base: 1, md: 0 }}
                justify={"flex-end"}
                direction={"row"}
                spacing={{ base: 1, md: 5 }}
              >
                <Center gap={{ base: 2, sm: 4 }}>
                  <IconButton
                    onClick={handleToggle}
                    icon={<MdSearch size={"20px"} />}
                    aria-label="Toggle Search Bar"
                    variant={"ghost"}
                    _hover={{ variant: "ghost" }}
                  />
                  <Button
                    aria-label="Toggle Color Mode"
                    onClick={toggleColorMode}
                    _focus={{ boxShadow: "none" }}
                    w="fit-content"
                    variant={"ghost"}
                    _hover={{ variant: "ghost" }}
                    _active={{ variant: "ghost" }}
                  >
                    {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
                  </Button>
                </Center>
                <Center gap={4}>
                  <Center
                    fontSize={"sm"}
                    fontWeight={600}
                    py={2}
                    color={"brand.600"}
                    border={"1px solid"}
                    borderColor={"brand.600"}
                    _hover={{
                      bg: "brand.700",
                      color: "white",
                    }}
                    borderRadius={"lg"}
                    w={"90px"}
                  >
                    <Link href={"/pages/signin"}>Write</Link>
                  </Center>
                  <Center
                    display={{ base: "none", md: "inline-flex" }}
                    fontSize={"sm"}
                    fontWeight={600}
                    py={2}
                    color={"white"}
                    bg={"brand.600"}
                    _hover={{
                      bg: "brand.700",
                    }}
                    w={"90px"}
                    borderRadius={"lg"}
                  >
                    <Link href={"/pages/signin"}>Sign In</Link>
                  </Center>
                </Center>
              </Stack>
            ) : (
              <NavMenu />
            )}
          </>
        )}
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
              <Center
                p={2}
                borderRadius={"xl"}
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
                color={colorMode === "light" ? "brand.800" : "gray.400"}
              >
                <Link href={navItem.href ?? "#"}>{navItem.label}</Link>
              </Center>
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
    <Center px={2} py={1} rounded={"md"} _hover={{ bg: "brand.700" }}>
      <Link href={href ?? "#"}>
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
    </Center>
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
  const { onToggle } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
        fontWeight={600}
        color={colorMode === "light" ? "brand.800" : "gray.400"}
      >
        <Link href={href ?? "#"}>{label}</Link>
      </Flex>
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
    label: "Home",
    href: "/",
  },
  {
    label: "Feed",
    href: "/pages/feed",
  },
];
