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

export const getCapitalizedName = (displayName: string) => {
  return displayName?.replace(/\b\w/g, (letter) => letter.toUpperCase());
};

export const removeSpaces = (string: string) => {
  return string.replace(/\s/g, "");
};
