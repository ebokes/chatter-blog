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
  Textarea,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import MarkdownIt from "markdown-it";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { ChatterContext } from "../context/ChatterContext";
import { useAuth } from "../hooks/auth";
import { useAddPost } from "../hooks/post";
import { calculateReadTime } from "../utils/funcns";
import Preview from "./Preview";
import TextareaAutoSize from "react-textarea-autosize";

const categories = [
  { value: "technology", label: "Technology" },
  { value: "science", label: "Science" },
  { value: "health", label: "Health" },
  { value: "business", label: "Business" },
  { value: "politics", label: "Politics" },
  { value: "sports", label: "Sports" },
  { value: "entertainment", label: "Entertainment" },
  { value: "travel", label: "Travel" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "food", label: "Food" },
  { value: "education", label: "Education" },
  { value: "culture", label: "Culture" },
  { value: "other", label: "Other" },
];

interface Entry {
  uid?: string;
  title: string;
  bannerImg: string;
  body: string;
  category: string;
  postedOn: number;
  postLength: number;
  intro: string;
}

const LiteEditor: React.FC = () => {
  const { entry, setEntry } = useContext(ChatterContext);
  const { colorMode } = useColorMode();
  const mdParser = new MarkdownIt();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { addPost, isLoading: publishingPost } = useAddPost();
  const { user } = useAuth();

  async function handlePublish(
    entry: Entry,
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
    console.log("handleEditorChange", text);
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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEntry((prevEntry) => ({
      ...prevEntry,
      [name]: value,
    }));
  };

  return (
    <Box w={"full"}>
      <form>
        <Flex flexDir={"column"} justify={"flex-end"} w={"full"}>
          <HStack justify={"space-between"} w={"100%"}>
            <Button onClick={onOpen}>Preview</Button>

            <ButtonGroup as={Flex} mb={"10px"} justifySelf={"flex-end"}>
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
            variant={"flushed"}
            autoComplete="off"
            py={2}
          />
          <Input
            as={TextareaAutoSize}
            required
            placeholder="Cover Image URL"
            type="text"
            name="bannerImg"
            onChange={handleInputChange}
            value={entry.bannerImg}
            autoComplete="off"
            variant={"flushed"}
            py={2}
          />
          <Select
            required
            placeholder="Select Category"
            name="category"
            border="1px  solid"
            borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
            value={entry.category}
            onChange={handleCategoryChange}
            variant={"flushed"}
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </Select>
          <Input
            required
            as={TextareaAutoSize}
            placeholder="Enter a brief description"
            type="text"
            name="intro"
            onChange={handleInputChange}
            value={entry.intro}
            autoComplete="off"
            variant={"flushed"}
            mb={"10px"}
            py={2}
          />
        </Flex>

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
