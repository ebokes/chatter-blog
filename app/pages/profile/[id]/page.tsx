"use client";

import Navbar from "@/app/components/nav/Navbar";
import { useAuth } from "@/app/hooks/auth";
import { usePostsUid } from "@/app/hooks/post";
import { useUser } from "@/app/hooks/user";
import { formatDate } from "@/app/utils/funcns";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaRegCommentDots } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineArticle, MdOutlineCake } from "react-icons/md";
import { TiGroup } from "react-icons/ti";

const Profile = () => {
  const params = useParams();
  const { id } = params;
  const { colorMode } = useColorMode();
  const { user, isLoading } = useUser(id);
  const { user: userAuth, isLoading: authLoading } = useAuth();
  const { posts, isLoading: postsLoading } = usePostsUid(id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  console.log("userAuth", userAuth);
  console.log("User", user);

  if (isLoading || !user) return <div>Loading...</div>;
  return (
    <main>
      <Navbar />
      <Box>
        <Box
          bgGradient={
            colorMode === "light"
              ? "linear(to bottom,  black 30%, #eeeded 30%, )"
              : "linear(to bottom,  black 30%, #19202a 30%, )"
          }
          // bgGradient="linear(to bottom,  black 30%, #eeeded 30%, )"
          w="100%"
          h={"100vh"}
          py={"150px"}
          // my={"30px"}
          // borderRadius={"lg"}

          // bg={colorMode === "light" ? "brand.300" : "brand.800"}
        >
          <Center
            mx={"auto"}
            mb={"10px"}
            // bg={"white"}
            bg={colorMode === "light" ? "white" : "brand.800"}
            borderRadius={"lg"}
            flexDir={"column"}
            textAlign={"center"}
            px={"10px"}
            py={"20px"}
            w={{ base: "100%", md: "80%", lg: "70%" }}
            gap={"10px"}
            pos={"relative"}
          >
            <Flex border={"7px solid black"} mt={"-90px"} borderRadius={"50%"}>
              <Avatar
                name={user?.displayName}
                size={"2xl"}
                src={user?.avatar}
                // mt={"-90px"}
              />
            </Flex>
            <Heading fontSize={{ base: "xl", md: "2xl" }}>
              {user?.displayName}
            </Heading>
            <Text>404 Bio not found</Text>
            <HStack>
              <Icon as={MdOutlineCake} size="33px" />
              <Text>Joined on {formatDate(user?.date ?? 0)}</Text>
              {userAuth?.id === user?.id && (
                <Button
                  onClick={onOpen}
                  pos={"absolute"}
                  top={"20px"}
                  right={"20px"}
                  colorScheme="blue"
                >
                  Edit
                </Button>
              )}
            </HStack>
          </Center>
          <Flex
            justify={"space-between"}
            mx={"auto"}
            w={{ base: "100%", md: "80%", lg: "70%" }}
          >
            <Box
              w={{ base: "100%", md: "300px" }}
              bg={colorMode === "light" ? "white" : "brand.800"}
              p={"14px"}
              borderRadius={"lg"}
              color={colorMode === "light" ? "#777a80" : "brand.350"}
            >
              <HStack>
                <Icon as={MdOutlineArticle} />
                <Text>{posts?.length} posts published</Text>
              </HStack>
              <HStack>
                <Icon as={FaRegCommentDots} />
                <Text>0 comments written</Text>
              </HStack>
              <HStack>
                <Icon as={TiGroup} />
                <Text>0 followers</Text>
              </HStack>
              <HStack>
                <Icon as={IoIosPeople} fontSize={"lg"} />
                <Text>0 following</Text>
              </HStack>
            </Box>
            <Box />
          </Flex>
        </Box>
      </Box>

      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>Avatar</FormLabel>
            <Input type="file" />
            <FormLabel>Full name</FormLabel>
            <Input type="text" placeholder="Full name" />
            <FormLabel>Occupation</FormLabel>
            <Input type="text" placeholder="Occupation" />
            <FormLabel>Preferred display name</FormLabel>
            <Input type="text" placeholder="Your preferred display name" />
            <FormLabel>Bio</FormLabel>
            <Input type="text" placeholder="Tell us about yourself" />
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" variant="solid">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </main>
  );
};

export default Profile;
