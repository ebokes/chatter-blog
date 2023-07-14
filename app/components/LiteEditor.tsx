import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import MarkdownIt from "markdown-it";
import React, { useContext, useEffect, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import TextareaAutoSize from "react-textarea-autosize";
import { ChatterContext } from "../context/ChatterContext";
import { useAuth } from "../hooks/auth";
import { PostProps, useAddPost } from "../hooks/post";
import { calculateReadTime } from "../utils/funcns";
import Preview from "./Preview";
import { categories } from "../utils/constants";

const LiteEditor: React.FC = () => {
  const { entry, setEntry } = useContext(ChatterContext);
  const { colorMode } = useColorMode();
  const mdParser = new MarkdownIt();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addPost, isLoading: publishingPost } = useAddPost();
  const { user } = useAuth();
  const [showCategory, setShowCategory] = useState(false);

  async function handlePublish(
    entry: PostProps,
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault();
    if (
      entry.title === "" ||
      entry.body === "" ||
      entry.category === "" ||
      entry.intro === "" ||
      entry.bannerImg === ""
    ) {
      toast({
        title: "Error",
        description: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      addPost({
        uid: user?.id,
        title: entry.title,
        bannerImg: entry.bannerImg,
        body: entry.body,
        category: entry.category,
        postLength: entry.postLength,
        postedOn: Date.now(),
        intro: entry.intro,
      });
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
      postLength: calculateReadTime(entry.body),
    }));
  }, [entry.body, setEntry]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEntry((prevEntry) => ({
      ...prevEntry,
      [name]: value,
    }));
  };

  const handleCategoryChange = (selectedCategory: any) => {
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
    <Box w={"full"}>
      <form>
        <Flex flexDir={"column"} justify={"flex-end"} w={"full"}>
          <HStack justify={"space-between"} w={"100%"}>
            <Button onClick={onOpen} colorScheme="gray">
              Preview
            </Button>
            {/* Publish Button */}
            <ButtonGroup as={Flex} mb={"10px"} justifySelf={"flex-end"}>
              <Button
                type="submit"
                colorScheme="blue"
                bg={"brand.600"}
                color={"white"}
                // onClick={(event) => handlePublish(entry, event)}
                // isLoading={publishingPost}
                // disabled={true}
                isDisabled={true}
                _hover={{
                  bg: "brand.700",
                }}
              >
                Save to Drafts
              </Button>
              <Button
                type="submit"
                colorScheme="blue"
                bg={"brand.600"}
                color={"white"}
                onClick={(event) => handlePublish(entry, event)}
                isLoading={publishingPost}
                _hover={{
                  bg: "brand.700",
                }}
              >
                Publish
              </Button>
            </ButtonGroup>
          </HStack>
          {/* Article Title */}
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
          {/* Image URL */}
          <Input
            as={TextareaAutoSize}
            required
            placeholder="Cover Image URL"
            type="text"
            name="bannerImg"
            onChange={handleInputChange}
            value={entry.bannerImg}
            autoComplete="off"
            variant={"ghost"}
            py={2}
            px={0}
            bg={"none"}
          />
          {/* Categories */}
          <Flex my={2} gap="1rem" justify={"space-between"} direction="column">
            <HStack align={"center"} justify={"space-between"}>
              <Button
                onClick={handleCategoryList}
                cursor={"pointer"}
                w="fit-content"
                borderRadius="md"
                px={4}
                // py={1}
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
                    onClick={() => handleCategoryChange(category.label)}
                  >
                    {category.label}
                  </Button>
                ))}
              </Flex>
            )}
          </Flex>

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
        </Flex>
        {/* Body Text Editor */}
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
  );
};

export default LiteEditor;
