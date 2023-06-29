// "use client";

// import { useAuth } from "@/app/hooks/auth";
// import {
//   Avatar,
//   Box,
//   Center,
//   HStack,
//   Heading,
//   Icon,
//   Text,
//   useColorMode,
// } from "@chakra-ui/react";
// import { FaRegCommentDots } from "react-icons/fa";
// import { IoIosPeople } from "react-icons/io";
// import { MdOutlineArticle } from "react-icons/md";
// import { TiGroup } from "react-icons/ti";

// const Profile = () => {
//   const { colorMode } = useColorMode();
//   const { user, isLoading } = useAuth();

//   const formatDate = (date: Date) => {
//     const newDate = new Date(date);
//     return newDate.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };
//   return (
//     <main>
//       <Box h={"100vh"}>
//         <Box
//           bgGradient={
//             colorMode === "light"
//               ? "linear(to bottom,  black 30%, #eeeded 30%, )"
//               : "linear(to bottom,  black 30%, #19202a 30%, )"
//           }
//           // bgGradient="linear(to bottom,  black 30%, #eeeded 30%, )"
//           w="100%"
//           py={"90px"}
//           my={"30px"}
//           borderRadius={"lg"}

//           // bg={colorMode === "light" ? "brand.300" : "brand.800"}
//         >
//           <Center
//             mx={"auto"}
//             mb={"10px"}
//             // bg={"white"}
//             bg={colorMode === "light" ? "white" : "brand.800"}
//             borderRadius={"lg"}
//             flexDir={"column"}
//             textAlign={"center"}
//             px={"10px"}
//             py={"20px"}
//             w={{ base: "100%", md: "90%", lg: "80%" }}
//             gap={"10px"}
//           >
//             <Avatar
//               name={user?.displayName}
//               size={"2xl"}
//               mt={"-90px"}
//               border={"5px solid black"}
//             />
//             <Heading fontSize={{ base: "xl", md: "2xl" }}>
//               {user?.displayName}
//             </Heading>
//             <Text>404 Bio not found</Text>
//             <Text>Joined on {formatDate(user?.date)}</Text>
//           </Center>
//           <Box
//             mx={"auto"}
//             w={{ base: "100%", md: "40%" }}
//             bg={colorMode === "light" ? "white" : "brand.800"}
//             // bg={"white"}
//             p={"14px"}
//             borderRadius={"lg"}
//             color={colorMode === "light" ? "#777a80" : "brand.350"}
//           >
//             <HStack>
//               <Icon as={MdOutlineArticle} />
//               <Text>0 posts published</Text>
//             </HStack>
//             <HStack>
//               <Icon as={FaRegCommentDots} />
//               <Text>0 comments written</Text>
//             </HStack>
//             <HStack>
//               <Icon as={TiGroup} />
//               <Text>0 followers</Text>
//             </HStack>
//             <HStack>
//               <Icon as={IoIosPeople} fontSize={"lg"} />
//               <Text>0 following</Text>
//             </HStack>
//           </Box>
//         </Box>
//       </Box>
//     </main>
//   );
// };

// export default Profile;
