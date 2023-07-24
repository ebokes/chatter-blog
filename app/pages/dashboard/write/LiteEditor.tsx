"use client";

import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tooltip,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import MarkdownIt from "markdown-it";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { RiSave3Fill, RiSendPlaneFill } from "react-icons/ri";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import TextareaAutoSize from "react-textarea-autosize";
import Preview from "../../../components/Preview";
import { ChatterContext } from "../../../context/ChatterContext";
import { useAuth } from "../../../hooks/auth";
import { PostProps, useAddSavePost } from "../../../hooks/post";
import { categories } from "../../../utils/constants";
import { calculateReadTime } from "../../../utils/funcns";

const LiteEditor: React.FC = () => {
  const { entry, setEntry } = useContext(ChatterContext);
  const { colorMode } = useColorMode();
  const mdParser = new MarkdownIt();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const [showCategory, setShowCategory] = useState(false);
  const { isLoading, isDraftLoading, fileURL, setFile, addSavePost } =
    useAddSavePost();

  const handleImageChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  async function handleAddSave(
    entry: PostProps,
    event: React.MouseEvent<HTMLButtonElement>,
    isSave: boolean
  ) {
    event.preventDefault();

    if (
      !isSave &&
      (entry.title === "" ||
        entry.body === "" ||
        entry.category === "" ||
        entry.intro === "")
    ) {
      toast({
        title: "Please fill all the fields",
        status: "error",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
    } else {
      addSavePost(
        {
          uid: user?.id,
          title: entry.title,
          body: entry.body,
          category: entry.category,
          postLength: entry.postLength,
          postedOn: Date.now(),
          intro: entry.intro,
        },
        isSave
      );
    }
  }

  const handleEditorChange = ({ text }: { text: string }) => {
    setEntry((prevEntry) => ({
      ...prevEntry,
      body: text,
    }));
  };

  useEffect(() => {
    setEntry((prevEntry) => ({
      ...prevEntry,
      postLength: calculateReadTime(entry?.body ?? ""),
    }));
  }, [entry.body, setEntry]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEntry((prevEntry) => ({
      ...prevEntry,
      [name]: value,
    }));
  };

  const handleCategoryChange = (selectedCategory: string) => {
    setEntry((prevEntry) => ({
      ...prevEntry,
      category: selectedCategory,
    }));
    setShowCategory(!showCategory);
  };

  const handleCategoryList = () => {
    setShowCategory(!showCategory);
  };

  return (
    <Stack maxW={"854px"} mx={"auto"} my={10} p={{ base: 0, md: 5 }}>
      <Flex pos={"relative"}>
        <Box w={"full"}>
          <form>
            <Flex flexDir={"column"} justify={"flex-end"} w={"full"}>
              <HStack justify={"space-between"} w={"100%"}>
                <Button onClick={onOpen} colorScheme="gray">
                  Preview
                </Button>
                <ButtonGroup as={Flex} mb={"10px"} justifySelf={"flex-end"}>
                  {/* Save to draft Button */}
                  <Tooltip hasArrow label="Save to Drafts (coming soon)">
                    <IconButton
                      aria-label="Save to Drafts"
                      icon={<RiSave3Fill fontSize={"25px"} />}
                      type="submit"
                      colorScheme="blue"
                      bg={"brand.600"}
                      color={"white"}
                      onClick={(event) => handleAddSave(entry, event, true)}
                      isLoading={isDraftLoading}
                      _hover={{
                        bg: "brand.700",
                      }}
                    />
                  </Tooltip>
                  {/* Publish Button */}
                  <Tooltip hasArrow label="Publish">
                    <IconButton
                      aria-label="publish"
                      icon={<RiSendPlaneFill fontSize={"25px"} />}
                      type="submit"
                      colorScheme="blue"
                      bg={"brand.600"}
                      color={"white"}
                      onClick={(event) => handleAddSave(entry, event, false)}
                      isLoading={isLoading}
                      _hover={{
                        bg: "brand.700",
                      }}
                    />
                  </Tooltip>
                </ButtonGroup>
              </HStack>
              {/* Article Title */}
              <Box>
                <Input
                  as={TextareaAutoSize}
                  required
                  placeholder="Title"
                  type="text"
                  name="title"
                  fontSize="2xl"
                  onChange={handleInputChange}
                  value={entry.title}
                  fontWeight={600}
                  variant={"ghost"}
                  autoComplete="off"
                  py={2}
                  px={0}
                  bg={"none"}
                />
                {/* Brief */}
                <Input
                  required
                  as={TextareaAutoSize}
                  placeholder="Enter a brief description"
                  type="text"
                  name="intro"
                  onChange={handleInputChange}
                  value={entry.intro}
                  autoComplete="off"
                  variant={"ghost"}
                  mb={"10px"}
                  py={2}
                  px={0}
                  bg={"none"}
                />
              </Box>
            </Flex>
            {/* Image File Upload */}
            {fileURL && (
              <Box mb={4}>
                <Image
                  src={fileURL}
                  width={300}
                  height={300}
                  alt={"banner image"}
                />
              </Box>
            )}

            <HStack align={"flex-start"}>
              <HStack>
                <Box>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    id="image-input"
                    display={"none"}
                  />
                  <FormLabel htmlFor="image-input" m={0}>
                    <Tooltip hasArrow label="Upload Image">
                      <IconButton
                        as={"span"}
                        aria-label="Image Select"
                        icon={<FiImage fontSize="25px" />}
                      />
                    </Tooltip>
                  </FormLabel>
                </Box>
              </HStack>
              <Divider
                orientation="vertical"
                h={"25px"}
                bg={"gray.700"}
                mx={2}
                mt={2}
              />
              {/* Categories */}
              <Flex gap="1rem" justify={"space-between"} direction="column">
                <HStack align={"center"} justify={"space-between"}>
                  <Button
                    onClick={handleCategoryList}
                    cursor={"pointer"}
                    w="fit-content"
                    borderRadius="md"
                    px={4}
                    colorScheme={entry.category ? "linkedin" : "gray"}
                  >
                    {entry.category || "Select Category"}
                  </Button>
                </HStack>

                {showCategory && (
                  <Flex
                    columnGap="1.5rem"
                    flexWrap="wrap"
                    rowGap={"1rem"}
                    py="1rem"
                    h={{ base: "10rem", md: "fit-content" }}
                    overflowY="auto"
                  >
                    {categories?.map((category) => (
                      <Button
                        key={category.value}
                        variant="solid"
                        bg={colorMode === "light" ? "#f5f6f6" : "#2b2e40"}
                        shadow={"md"}
                        color={colorMode === "light" ? "dark" : "#d0d0d0"}
                        px={4}
                        py={2}
                        borderRadius={"md"}
                        onClick={() => handleCategoryChange(category.value)}
                      >
                        {category.label}
                      </Button>
                    ))}
                  </Flex>
                )}
              </Flex>
            </HStack>

            {/* Body Text Editor */}

            <Box mt={4}>
              <MdEditor
                style={{ height: "500px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
                view={{ menu: true, md: true, html: false }}
                shortcuts={true}
                canView={{
                  menu: true,
                  md: true,
                  html: false,
                  both: false,
                  fullScreen: false,
                  hideMenu: false,
                }}
              />
            </Box>
          </form>
          {/* Article Previewer */}
          <Modal onClose={onClose} isOpen={isOpen} isCentered size={"3xl"}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Article Preview</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Preview />
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Flex>
    </Stack>
  );
};

export default LiteEditor;
