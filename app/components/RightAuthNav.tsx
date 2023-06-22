// import {
//   Flex,
//   IconButton,
//   HStack,
//   Input,
//   Menu,
//   MenuButton,
//   Avatar,
//   VStack,
//   MenuList,
//   MenuItem,
//   MenuDivider,
//   Box,
// } from "@chakra-ui/react";
// import React, { useState } from "react";
// import { BsMoonStarsFill, BsSun } from "react-icons/bs";
// import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
// import { MdSearch } from "react-icons/md";
// import { useAuth } from "../hooks/auth";
// import { useSignOut } from "react-firebase-hooks/auth";

// const RightAuthNav = () => {
//   const { colorMode, toggleColorMode } = useColorMode();
//   const [show, setShow] = useState(false);
//   const router = useRouter();
//   const { user, isLoading } = useAuth();
//   const [signOut, loading, error] = useSignOut(auth);

//   console.log("Profile", user);

//   const Logout = () => {
//     signOut();
//     router.push("/");
//   };

//   const handleToggle = () => setShow(!show);
//   return (
//     <Flex
//       ml={{ base: 0, md: 60 }}
//       px={{ base: 4, md: 4 }}
//       height="20"
//       alignItems="center"
//       // bg="white"
//       bg={colorMode === "light" ? "white" : "dark"}
//       color={colorMode === "light" ? "brand.800" : "brand.300"}
//       borderBottomWidth="1px"
//       borderBottomColor={colorMode === "light" ? "brand.400" : "brand.450"}
//       justifyContent={{ base: "space-between", md: "flex-end" }}
//       {...rest}
//     >
//       <IconButton
//         display={{ base: "flex", md: "none" }}
//         onClick={onOpen}
//         variant="outline"
//         aria-label="open menu"
//         icon={<FiMenu />}
//       />

//       <HStack justify={"flex-end"} w={"90%"} pos={"relative"}>
//         {show && (
//           <>
//             {/* <Icon
//                 as={MdSearch}
//                 pos={"absolute"}
//                 boxSize={"26px"}
//                 left={"5px"}
//                 opacity={0.7}
//               /> */}

//             <Input
//               maxW="20rem"
//               placeholder="Search Chatter..."
//               borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
//               borderRadius="5px"
//               // display={{ base: "none", md: "block" }}
//               justifySelf={"flex-start"}
//               // pl="35px"
//             />
//           </>
//         )}
//         <HStack>
//           <IconButton
//             onClick={handleToggle}
//             icon={<MdSearch />}
//             aria-label="Toggle Search Bar"
//             variant={"ghost"}
//             _hover={{ variant: "ghost" }}
//           />

//           <IconButton
//             aria-label="Toggle Color Mode"
//             onClick={toggleColorMode}
//             variant={"ghost"}
//             _hover={{ variant: "ghost" }}
//             icon={colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
//           />
//         </HStack>
//         <HStack spacing={{ base: "0", md: "6" }}>
//           <IconButton
//             // size="lg"
//             variant="ghost"
//             aria-label="open menu"
//             icon={<FiBell />}
//           />
//           <Flex alignItems={"center"}>
//             <Menu>
//               <MenuButton
//                 py={2}
//                 transition="all 0.3s"
//                 _focus={{ boxShadow: "none" }}
//               >
//                 <HStack>
//                   <Avatar
//                     size={"sm"}
//                     name={user?.firstName + " " + user?.lastName}
//                     src={user?.avatar}
//                   />
//                   {/* <Text>{session?.data?.user?.email}</Text> */}
//                   <VStack
//                     display={{ base: "none", md: "flex" }}
//                     alignItems="flex-start"
//                     spacing="1px"
//                     ml="2"
//                   >
//                     <Text fontSize="sm">
//                       {user?.displayName ||
//                         user?.email?.split("@")[0] ||
//                         user?.username}
//                     </Text>
//                     {/* <Text fontSize="xs" color="gray.600">
//                         Admin
//                       </Text> */}
//                   </VStack>
//                   <Box display={{ base: "none", md: "flex" }}>
//                     <FiChevronDown />
//                   </Box>
//                 </HStack>
//               </MenuButton>
//               <MenuList bg="white" borderColor="gray.200">
//                 <MenuItem>Profile</MenuItem>
//                 <MenuItem>Settings</MenuItem>
//                 <MenuItem>Billing</MenuItem>
//                 <MenuDivider />
//                 <MenuItem onClick={Logout}>Sign out</MenuItem>
//               </MenuList>
//             </Menu>
//           </Flex>
//         </HStack>
//       </HStack>
//     </Flex>
//   );
// };

// export default RightAuthNav;
