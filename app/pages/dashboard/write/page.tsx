"use client";

import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  IconButton,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React, { ReactElement, useState, ChangeEvent } from "react";
import { CiImageOn, CiVideoOn } from "react-icons/ci";
import { TfiClose, TfiPlus } from "react-icons/tfi";
import { IconType } from "react-icons";
import ReactMarkdown from "react-markdown";
import MarkdownWrapper from "@/app/components/MarkdownWrapper";
import { Firestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import Tiptap from "@/app/components/TipTap";

interface WriteProps {
  icon: ReactElement<IconType>;
}

interface MarkdownFile {
  filename: string;
  content: string;
}

// import { useState } from "react";
// import firebase from "firebase/app";
// import "firebase/firestore";
// import Error from "next/error";

// interface MarkdownProps {
//   markdown: string;
// }

// const Markdown: React.FC<MarkdownProps> = ({ markdown }) => {
//   const [saving, setSaving] = useState(false);

//   const saveMarkdownToFirestore = () => {
//     setSaving(true);
//     const db = firebase.firestore(); // Access Firestore through the firestore() method
//     db.collection("markdowns")
//       .add({
//         content: markdown,
//         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//       })
//       .then(() => {
//         console.log("Markdown saved to Firestore!");
//       })
//       .catch((error: Error) => {
//         console.error("Error saving markdown to Firestore: ", error);
//       })
//       .finally(() => {
//         setSaving(false);
//       });
//   };

// return (
//   <div>
//     <div>
//       <div className="output">{/* Render Markdown content here */}</div>
//     </div>
//     <button onClick={saveMarkdownToFirestore} disabled={saving}>
//       {saving ? "Saving..." : "Save to Firestore"}
//     </button>
//   </div>
// );
// };

const Write = ({ icon }: WriteProps): React.JSX.Element => {
  // const [open, setOpen] = useState(false);
  const [markdown, setMarkdown] = useState<string>("");

  const handleMarkdownChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };
  return (
    <>
      <Stack maxW={"854px"} mx={"auto"} my={6} p={{ base: 0, md: 5 }}>
        <Flex justify={"flex-end"} w={"100%"} gap={2}>
          {/* <Box w={"78px"} /> */}

          <Button bg="#543EE0" color="#fff" _hover={{ bg: "#715fe3" }}>
            Save to draft
          </Button>
          <Button
            bg="#543EE0"
            color="#fff"
            // disabled={markdown.length < 1}
            _hover={{ bg: "#715fe3" }}
            // onClick={saveMarkdownToFirestore}
            // disabled={saving}
          >
            Publish
          </Button>
        </Flex>
        <Flex pos={"relative"}>
          <Textarea
            maxW={"full"}
            minH={"800px"}
            // ml={"45px"}
            placeholder="Enter text in markdown text"
            zIndex={5}
            value={markdown}
            onChange={handleMarkdownChange}
          />
          {/* <HStack pos={"absolute"} top={16} height={"44px"}>
            <IconButton
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Add media"
              icon={open ? <TfiClose /> : <TfiPlus />}
              fontSize={"20px"}
              border={"1px solid black"}
              borderRadius={"50%"}
              variant="outline"
            />
            {open && (
              <HStack zIndex={6}>
                <Divider orientation="horizontal" h={12} color={"#543EE0"} />
                <HStack>
                  <IconButton
                    aria-label="Add Image"
                    icon={<CiImageOn />}
                    fontSize={"25px"}
                    border={"1px solid #543EE0"}
                    borderRadius={"50%"}
                    color={"#543EE0"}
                    variant="outline"
                  />
                  <IconButton
                    aria-label="Add Image"
                    icon={<CiVideoOn />}
                    fontSize={"25px"}
                    border={"1px solid #543EE0"}
                    borderRadius={"50%"}
                    color={"#543EE0"}
                    variant="outline"
                  />
                </HStack>
              </HStack>
            )}
          </HStack> */}
        </Flex>
        {markdown && (
          <Heading mt={10} mb={5} fontSize={"2xl"}>
            Preview
          </Heading>
        )}
        <MarkdownWrapper>{markdown}</MarkdownWrapper>
        <Tiptap />
      </Stack>
    </>
  );
};

export default Write;
