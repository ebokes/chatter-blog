"use client";

import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactElement } from "react";

import { AiOutlineLineChart } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { BsLayoutTextWindowReverse } from "react-icons/bs";
import { IconType } from "react-icons";

interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
}

interface CardDetailsProps {
  heading: string;
  icon?: IconType;
  description: string;
}

const CardDetails: Array<CardDetailsProps> = [
  {
    heading: "Analytics",
    icon: AiOutlineLineChart,
    description:
      "Analytics to track the number of views, likes and comment and also analyze the performance of your articles over a period of time",
  },
  {
    heading: "Social interactions",
    icon: HiUserGroup,
    description:
      "Users on the platform can interact with posts they like, comment and engage in discussions",
  },
  {
    heading: "Content creation",
    icon: BsLayoutTextWindowReverse,
    description:
      "Write nice and appealing with our in-built markdown, a rich text editor",
  },
];
const Card = ({ heading, description, icon }: CardProps) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={"start"} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"black"}
          rounded={"full"}
          bg="gray.100"
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading
            size="md"
            color={colorMode === "light" ? "brand.850" : "brand.300"}
          >
            {heading}
          </Heading>
          <Text
            color={colorMode === "light" ? "brand.900" : "brand.350"}
            mt={1}
            fontSize={"sm"}
          >
            {description}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default function Features() {
  const { colorMode } = useColorMode();
  return (
    <Box
      px={4}
      py={{ base: "55px", md: "72px" }}
      bg={colorMode === "light" ? "light" : "brand.800"}
      color={colorMode === "light" ? "brand.800" : "gray.400"}
    >
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading
          fontSize={{ base: "2xl", sm: "4xl" }}
          fontWeight={"bold"}
          color={colorMode === "light" ? "brand.850" : "brand.300"}
        >
          Why you should join chatter
        </Heading>
        <Text
          color={colorMode === "light" ? "brand.900" : "brand.350"}
          fontSize={{ base: "sm", sm: "lg" }}
        >
          Our goal is to make writers and readers see our platform as their next
          heaven for blogging, ensuring ease in interactions, connecting with
          like-minded peers, have access to favorite content based on interests
          and able to communicate your great ideas with people
        </Text>
      </Stack>

      <Container maxW={"5xl"} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          {CardDetails.map((item) => (
            <Card
              key={item.heading}
              heading={item.heading}
              icon={<Icon as={item.icon} w={10} h={10} />}
              description={item.description}
            />
          ))}
        </Flex>
      </Container>
    </Box>
  );
}
