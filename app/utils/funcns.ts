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

export const sortPost = (posts: any) => {
  const sortedPosts = posts?.sort((a: any, b: any) => b.postedOn - a.postedOn);
  return sortedPosts?.slice(0, 5);
};
