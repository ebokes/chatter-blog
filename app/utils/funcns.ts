import { PostProps } from "../hooks/post";
import { DocumentData } from "firebase/firestore";
import { format } from "date-fns";

export const formatDate = (date: number) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const calculateReadTime = (content: string) => {
  const wordCount = content.trim().split(/\s+/).length;
  const averageReadingSpeed = 100;
  const readTime = Math.ceil(wordCount / averageReadingSpeed);
  return readTime;
};

export const getCapitalizedName = (text: string) => {
  return text.replace(/\b\w/g, (letter) => letter.toUpperCase());
};

export const removeSpaces = (string: string) => {
  return string.replace(/\s/g, "");
};

export const sortPost = (posts: (PostProps | DocumentData)[] | undefined) => {
  if (!posts) return [];
  const filteredPosts = posts.filter((post) => post.hasOwnProperty("postedOn"));

  const sortedPosts = filteredPosts.sort((a, b) => {
    const postedOnA = (a as PostProps).postedOn as number | Date;
    const postedOnB = (b as PostProps).postedOn as number | Date;
    return (postedOnB as any) - (postedOnA as any);
  });

  return sortedPosts.slice(0, 5);
};

export const formatPostedOn = (
  postedOn: number | Date | string | undefined
) => {
  if (!postedOn) return "";
  if (typeof postedOn === "number") {
    return format(new Date(postedOn), "MMM d, yyyy");
  } else if (postedOn instanceof Date) {
    return format(postedOn, "MMM d, yyyy");
  } else {
    return "";
  }
};
