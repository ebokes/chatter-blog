"use client";

import {
  Box,
  Button,
  Avatar as CAvatar,
  Center,
  Divider,
  Flex,
  FormControl,
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
  Stack,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineCake } from "react-icons/md";
import Navbar from "@/app/components/nav/Navbar";
import PostList from "@/app/components/posts/PostList";
import { useAuth } from "@/app/hooks/auth";
import { usePostsUid } from "@/app/hooks/post";
import { useProfileEdit, useUpdateAvatar, useUser } from "@/app/hooks/user";
import Loading from "@/app/loader/Loading";
import { formatDate, getCapitalizedName } from "@/app/utils/funcns";

const ProfilePage = () => {
  const { colorMode } = useColorMode();
  const { id } = useParams();
  const { user, isLoading } = useUser(id);
  const { user: userAuth, isLoading: authLoading } = useAuth();
  const { posts, isLoading: postsLoading } = usePostsUid(id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isEditing, handleUserEdit } = useProfileEdit();

  const {
    setFile,
    updateAvatar,
    isLoading: fileLoading,
    fileURL,
  } = useUpdateAvatar(userAuth?.id);

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (userAuth) {
      setDisplayName(getCapitalizedName(userAuth.displayName) ?? "");
      setUsername(userAuth.username ?? "");
      setBio(userAuth.bio ?? "");
      setRole(userAuth.role ?? "");
    }
  }, [userAuth]);

  const handleChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSave = async () => {
    await updateAvatar();
    onClose();
    await handleUserEdit(userAuth, displayName, username, bio, role);
  };

  if (isLoading || !user) {
    return (
      <>
        <Navbar />
        <Loading />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        {/* <Box> */}
        <Stack bg={colorMode === "light" ? "#eeeded" : "#19202a"}>
          <Box
            bgImage={"/images/abs2.webp"}
            h={"200px"}
            backgroundSize={"cover"}
            backgroundRepeat={"no-repeat"}
          />
          <Box mx={{ base: 1, md: 0 }}>
            <Center
              mx={"auto"}
              mb={"10px"}
              mt={"-60px"}
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
              <Flex
                border={"2px solid "}
                borderColor={colorMode === "light" ? "white" : "brand.800"}
                mt={"-90px"}
                borderRadius={"50%"}
              >
                <CAvatar
                  name={user?.displayName}
                  size={"2xl"}
                  src={user?.avatar}
                />
              </Flex>
              <Heading fontSize={{ base: "xl", md: "2xl" }}>
                {user?.displayName}
              </Heading>
              {user?.username ? (
                <Text>@{user?.username}</Text>
              ) : (
                <Text>{user?.email}</Text>
              )}

              <HStack>
                <Icon as={MdOutlineCake} size="33px" />
                <Text>Joined on {formatDate(user?.date ?? 0)}</Text>
                {!authLoading && userAuth?.id === user?.id && (
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
              mt={"10px"}
              mb={"60px"}
            >
              <Flex
                gap={"10px"}
                w={"full"}
                bg={colorMode === "light" ? "white" : "brand.800"}
                p={"14px"}
                borderRadius={"lg"}
                color={colorMode === "light" ? "#777a80" : "brand.350"}
              >
                <Stack flex={1}>
                  <HStack align={"flex-start"}>
                    <Heading fontSize={"18px"}>Bio: </Heading>
                    <Text>{user?.bio}</Text>
                  </HStack>
                  <HStack align={"flex-start"}>
                    <Heading fontSize={"18px"}>Occupation: </Heading>
                    <Text>{user?.role}</Text>
                  </HStack>
                  <HStack>
                    {user?.username && (
                      <>
                        <Heading fontSize={"18px"}>Email: </Heading>
                        <Text>{user?.email}</Text>
                      </>
                    )}
                  </HStack>
                </Stack>
                <Divider orientation="vertical" mx={4} />
                <Stack flex={1}>
                  <HStack>
                    <Heading fontSize={"18px"}>Posts Published: </Heading>
                    <Text>{posts?.length} </Text>
                  </HStack>
                  <HStack>
                    <Heading fontSize={"18px"}>Followers: </Heading>
                    <Text>0</Text>
                  </HStack>
                  <HStack>
                    <Heading fontSize={"18px"}>Following: </Heading>
                    <Text>0 </Text>
                  </HStack>
                </Stack>
              </Flex>
              <Box />
            </Flex>
          </Box>
          <Center px={2}>
            <Box maxW={"800px"} mx={"auto"} mb={"100px"}>
              <Heading fontSize={"2xl"}>Articles</Heading>
              {postsLoading ? (
                <Loading />
              ) : (
                <PostList posts={posts} link="dashboard" />
              )}
            </Box>
          </Center>
        </Stack>
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
              <Flex gap={3}>
                <CAvatar
                  name={user?.displayName}
                  size={"lg"}
                  src={fileURL ?? user?.avatar}
                />
                <FormControl>
                  <FormLabel>Avatar</FormLabel>
                  <Input type="file" accept="image/*" onChange={handleChange} />
                </FormControl>
              </Flex>
              <FormLabel>Full name</FormLabel>
              <Input
                name="displayName"
                type="text"
                placeholder="Full name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FormLabel>Occupation</FormLabel>
              <Input
                type="text"
                placeholder="Occupation"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                name="role"
              />

              <FormLabel>Bio</FormLabel>
              <Input
                name="bio"
                type="text"
                placeholder="Tell us about yourself"
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                loadingText={"Saving..."}
                colorScheme="blue"
                variant="solid"
                onClick={handleSave}
                isLoading={fileLoading || isEditing}
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </main>
    </>
  );
};

export default ProfilePage;
