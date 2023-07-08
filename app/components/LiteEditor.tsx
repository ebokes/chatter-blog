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
import { ChatterContext } from "../context/ChatterContext";
import Preview from "./Preview";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/auth";
import { useAddPost, useUploadBannerImg } from "../hooks/post";
import { calculateReadTime } from "../utils/funcns";

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
  // const [publishLoading, setPublishLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { addPost, isLoading: publishingPost } = useAddPost();
  const { user, isLoading: authLoading } = useAuth();

  const {
    setFile,
    uploadBannerImg,
    isLoading: fileLoading,
    fileURL,
  } = useUploadBannerImg();

  // async function handlePublish(
  //   entry: Entry,
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) {
  //   event.preventDefault();
  //   addPost({
  //     uid: user?.id,
  //     title: entry.title,
  //     bannerImg: entry.bannerImg,
  //     body: entry.body,
  //     category: entry.category,
  //     postLength: entry.postLength,
  //     postedOn: Date.now(),
  //     intro: entry.intro,
  //   });
  // }

  function handlePublish(
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
      uploadBannerImg();
    }
  }

  const handleEditorChange = ({
    html,
    text,
  }: {
    text: string;
    html: string;
  }) => {
    // console.log("handleEditorChange", html, text);
    setEntry((prevEntry) => ({
      ...prevEntry,
      body: html,
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

  function handleBannerImgChange(e: any) {
    setFile(e.target.files[0]);
  }
  // You were going to figure out how to upload images firebase storage url to the post in firebase storage

  return (
    <Box w={"full"}>
      <form>
        <Flex flexDir={"column"} justify={"flex-end"} w={"full"}>
          <HStack justify={"space-between"} w={"100%"}>
            {/* <Box /> */}
            <Button onClick={onOpen}>Preview</Button>

            <ButtonGroup as={Flex} mb={"10px"} justifySelf={"flex-end"}>
              <Button
                type="submit"
                bg="#543EE0"
                _hover={{ bg: "#715fe3" }}
                color={"white"}
                onClick={(event) => handlePublish(entry, event)}
                isLoading={publishingPost}
              >
                Publish
              </Button>
            </ButtonGroup>
          </HStack>
          <Input
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
            // borderBottom={"1px solid brand.400"}
            // _focus={{
            //   borderBottom: "1px solid brand.400",
            // }}
          />
          {/* <Input
            required
            placeholder="Cover Image URL"
            type="text"
            name="bannerImg"
            onChange={handleInputChange}
            value={entry.bannerImg}
            autoComplete="off"
            variant={"flushed"}
          /> */}
          <Input
            required
            placeholder="Cover Image URL"
            type="file"
            name="bannerImg"
            onChange={handleBannerImgChange}
            value={entry.bannerImg}
            autoComplete="off"
            variant={"flushed"}
            accept="image/*"
          />

          {/* <label>You are joining as?</label> */}
          <Select
            required
            // {...register("joiningAs")}
            placeholder="Select Category"
            name="category"
            border="1px  solid"
            borderColor={colorMode === "light" ? "brand.400" : "brand.450"}
            value={entry.category}
            onChange={handleCategoryChange}
            variant={"flushed"}
          >
            {/* <option value="">Select Category</option> */}
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </Select>
          <Input
            required
            placeholder="Enter a brief description"
            type="text"
            name="intro"
            onChange={handleInputChange}
            value={entry.intro}
            autoComplete="off"
            variant={"flushed"}
            mb={"10px"}
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
          // onImageUpload={onImageUpload}
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
