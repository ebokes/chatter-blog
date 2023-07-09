"use client";

// import Comments from "@/app/components/Comments";
import { ChatterContext } from "@/app/context/ChatterContext";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import MarkdownIt from "markdown-it";
import Image from "next/image";
import { useContext } from "react";
import { VscBook } from "react-icons/vsc";
import { useAuth } from "../hooks/auth";
import { formatDate } from "../utils/funcns";
// import { formatDate } from "../utils/formatDate";

interface MarkdownProps {
  children: string;
}

// interface MarkdownRendererProps {
//   markdownText: string;
// }

interface FormattedArticleProps {
  content: string;
}

const FormattedArticle: React.FC<FormattedArticleProps> = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

// Usage example
const htmlContent =
  "<h1>Mastering the Art of Public Speaking: Key Tips for Success</h1> ..."; // Provide your HTML content here

// const ArticlePage: React.FC = () => {
//   return (
//     <div>
//       <h1>Article Page</h1>
//       <FormattedArticle content={htmlContent} />
//     </div>
//   );
// };

// export default ArticlePage;

const Preview = () => {
  const { colorMode } = useColorMode();
  const { entry } = useContext(ChatterContext);
  const { user, isLoading: authLoading } = useAuth();
  // const { googleUser, googleLoading } = useGoogle();

  // console.log("Preview => ", googleUser);
  // const { isOpen: previewIsOpen, onClose: previewOnClose } = useDisclosure();

  function renderMarkdownToHtml(markdownText: string): React.ReactNode {
    const md = new MarkdownIt();
    const html = md.render(markdownText);
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

  // console.log(entry.body);

  return (
    <>
      <Box
        borderRadius={"lg"}
        mb={6}
        color={colorMode === "light" ? "brand.800" : "brand.400"}
      >
        <Stack mt={27} mx={{ base: "0px", lg: "44px" }}>
          <Box>
            <Flex justify={"space-between"} w={"full"}>
              <Flex gap={2} mb={"15px"}>
                {/* <Avatar size="md" name={post?.data?.author} /> */}
                <Avatar size="md" name={user?.displayName} />
                <Box>
                  <Heading fontSize={"20px"} fontWeight={600} mb={1}>
                    {/* {post?.data?.author} */}
                    {user?.displayName}
                  </Heading>
                  <HStack flexWrap={"wrap"}>
                    <Text>@{user?.username}</Text>
                    {/* <Text>{post?.data?.role}</Text> */}
                    <Box
                      boxSize={"4px"}
                      bg={colorMode === "light" ? "brand.800" : "brand.400"}
                      borderRadius={"full"}
                    />
                    <Text>{formatDate(entry.postedOn)}</Text>
                    <Box
                      boxSize={"4px"}
                      bg={colorMode === "light" ? "brand.800" : "brand.400"}
                      borderRadius={"full"}
                    />
                    <HStack>
                      <Icon as={VscBook} />{" "}
                      <Text>{entry.postLength} mins read</Text>
                    </HStack>
                  </HStack>
                </Box>
              </Flex>
            </Flex>
            <Flex flex={0.7}>
              {entry.bannerImg && (
                <Image
                  src={entry.bannerImg}
                  width={412}
                  height={142}
                  alt="img"
                  style={{
                    width: "612px",
                    objectFit: "cover",
                    height: "342px",
                    objectPosition: "center",
                  }}
                />
              )}
            </Flex>
            <Box>
              <Stack flex={1}>
                <Heading fontWeight={700} fontSize={"34px"} my={"30px"}>
                  {entry.title}
                </Heading>
                <Box>
                  <FormattedArticle content={entry.body} />
                </Box>
                {/* <Box>{renderMarkdownToHtml(entry.body)}</Box> */}
                {/* <Box>{entry.body}</Box> */}
              </Stack>
            </Box>
          </Box>
          <HStack>
            {/* <HStack>
            {post?.data?.tags.map((tag, i) => (
              <Button
                variant={"outline"}
                px={"8px"}
                h={"32px"}
                fontSize={"14px"}
                key={i}
              >
                {tag}
                // {i > 1 && `+${post?.data?.tags.length - 2}`}
              </Button>
            ))}
          </HStack> */}
          </HStack>
          {/* <Flex justify={"flex-end"}>
          <HStack gap={"20%"}>
            {post?.data?.footer?.map((footerpost?.data?, i) => (
              <Button key={i} variant={"ghost"}>
                <Icon as={footerpost?.data?.icon} mr={1} />
                <Text>{footerpost?.data?.count}</Text>
              </Button>
            ))}
          </HStack>
        </Flex> */}
        </Stack>
      </Box>
      {/* ))} */}
    </>
  );
};

export default Preview;
