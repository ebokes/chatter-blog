"use client";

import Navbar from "@/app/components/nav/Navbar";
import PostList from "@/app/components/posts/PostList";
import { useAuth } from "@/app/hooks/auth";
import { usePostsUid } from "@/app/hooks/post";
import { useUpdateAvatar, useUser } from "@/app/hooks/user";
import { db } from "@/app/lib/firebase";
import Loading from "@/app/loader/Loading";
import { formatDate, getCapitalizedName } from "@/app/utils/funcns";
import {
  Box,
  Button,
  Avatar as CAvatar,
  Center,
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
  useToast,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
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
  const toast = useToast();
  const { posts, isLoading: postsLoading } = usePostsUid(id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isFollowMe, setIsFollowMe] = useState(false);

  const {
    setFile,
    updateAvatar,
    isLoading: fileLoading,
    fileURL,
  } = useUpdateAvatar(userAuth?.id);
  // const { followMe, id } = userAuth;
  // const config = { id, isFollowMe, uid: userAuth?.id ?? "" };
  // const { toggleFollowMe, followMeLoading } = useToggleFollowMe(config);
  // const isFollowMe = followMe?.includes(userAuth?.id ?? "");

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState("");

  const [initialProfile, updateInitialProfile] = useState(userAuth);
  console.log(fileURL);

  // console.log(getCapitalizedName("emelder charles"));
  const [followLoading, setFollowLoading] = useState(false);

  const toggleFollowMe = () => {
    setIsFollowMe(!isFollowMe);
  };

  // const handleFollowMe = async () => {
  // setFollowLoading(true);
  // try {
  //   await toggleFollowMe();
  //   setIsFollowMe(!isFollowMe);
  //   toast({
  //     title: "FollowMe updated!",
  //     status: "success",
  //     isClosable: true,
  //     position: "top",
  //     duration: 5000,
  //   });
  // } catch (error) {
  //   toast({
  //     title: "Error updating FollowMe!",
  //     status: "error",
  //     isClosable: true,
  //     position: "top",
  //     duration: 5000,
  //   });
  // }finally{
  //   setFollowLoading(false);
  // }
  // }

  useEffect(() => {
    if (userAuth) {
      setDisplayName(getCapitalizedName(userAuth.displayName) ?? "");
      setBio(userAuth.bio ?? "");
      setRole(userAuth.role ?? "");
    }
  }, [userAuth]);

  function handleChange(e: any) {
    setFile(e.target.files[0]);
  }

  const handleUserEdit = async () => {
    try {
      const userRef = doc(db, "users", userAuth?.id);
      await updateDoc(userRef, {
        displayName,
        bio,
        role,
      });
      updateInitialProfile({
        ...initialProfile,
        displayName,
        bio,
        role,
      });
      toast({
        title: "Profile updated!",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error updating user profile",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
    }
  };

  const handleSave = () => {
    updateAvatar();
    onClose();
    handleUserEdit();
  };

  if (isLoading || !user)
    return (
      <>
        <Navbar />
        <Loading />
      </>
    );

  return (
    <>
      <Navbar />
      <main>
        <Stack
          bg={colorMode === "light" ? "brand.470" : "brand.800"}
          h={"fit-content"}
        >
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
              <Flex
                border={"7px solid black"}
                mt={"-90px"}
                borderRadius={"50%"}
              >
                <CAvatar
                  name={user?.displayName}
                  size={"2xl"}
                  src={user?.avatar}
                  // mt={"-90px"}
                />
              </Flex>
              <Heading fontSize={{ base: "xl", md: "2xl" }}>
                {user?.displayName}
              </Heading>
              <Text>{user?.bio}</Text>
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
                {userAuth?.id !== user?.id && (
                  <Button
                    color="green"
                    // variant={"ghost"}
                    display={"inline"}
                    ml={"20px"}
                    // cursor={"pointer"}
                  >
                    Follow
                  </Button>
                )}
                <>
                  {isFollowMe ? (
                    <Button onClick={toggleFollowMe} ml={"20px"} color="green">
                      Unfollow
                    </Button>
                  ) : (
                    <Button onClick={toggleFollowMe} ml={"20px"} color="green">
                      Follow
                    </Button>
                  )}
                </>
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
            <Box maxW={"800px"} mx={"auto"} my={"100px"}>
              <Heading fontSize={"2xl"}>Articles</Heading>

              {postsLoading ? <Loading /> : <PostList posts={posts} />}
            </Box>
          </Box>
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
                {/* <Avatar user={user} size={"lg"} /> */}
                <CAvatar
                  name={user?.displayName}
                  size={"lg"}
                  src={fileURL ?? user?.avatar}
                  // mt={"-90px"}
                />
                <FormControl>
                  <FormLabel>Avatar</FormLabel>
                  <Input type="file" accept="image/*" onChange={handleChange} />
                </FormControl>
              </Flex>
              <FormLabel>Full name</FormLabel>
              <Input
                // name={userProfile?.displayName}
                name="displayName"
                type="text"
                placeholder="Full name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <FormLabel>Occupation</FormLabel>
              <Input
                type="text"
                placeholder="Occupation"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                // name={inputedUserProfile?.occupation}
                name="role"
              />
              {/* <FormLabel>Preferred display name</FormLabel>
              <Input
                type="text"
                placeholder="Your preferred display name"
                value={inputedUserProfile?.username}
                onChange={handleTextChange}
                name="username"
              /> */}
              <FormLabel>Bio</FormLabel>
              <Input
                name="bio"
                // name={bio}
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
                isLoading={fileLoading}
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

export default Profile;
