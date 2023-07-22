import { IconType } from "react-icons";
import { BsLayoutWtf } from "react-icons/bs";
import {
  MdInsertChartOutlined,
  MdOutlineBookmarks,
  MdOutlineDrafts,
} from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { SlLike } from "react-icons/sl";

interface ItemProps {
  name: string;
  icon?: IconType;
  href?: string;
}

export const categories = [
  { value: "technology", label: "Technology" },
  { value: "coding", label: "Coding" },
  { value: "programming", label: "Programming" },
  { value: "science", label: "Science" },
  { value: "ai", label: "AI" },
  { value: "health", label: "Health" },
  { value: "blockchain", label: "Blockchain" },
  { value: "crypto", label: "Crypto" },
  { value: "business", label: "Business" },
  { value: "marketing", label: "Marketing" },
  { value: "design", label: "Design" },
  { value: "productivity", label: "Productivity" },
  { value: "motivation", label: "Motivation" },
  { value: "psychology", label: "Psychology" },
  { value: "politics", label: "Politics" },
  { value: "sports", label: "Sports" },
  { value: "entertainment", label: "Entertainment" },
  { value: "travel", label: "Travel" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "food", label: "Food" },
  { value: "education", label: "Education" },
  { value: "culture", label: "Culture" },
  { value: "games", label: "Games" },
];

export const LinkItems: Array<ItemProps> = [
  { name: "Feed", icon: BsLayoutWtf, href: "/pages/dashboard" },
  {
    name: "Bookmarks",
    icon: MdOutlineBookmarks,
    href: "/pages/dashboard/bookmarks",
  },
  { name: "Drafts", icon: MdOutlineDrafts, href: "/pages/dashboard/drafts" },
  {
    name: "Analytics",
    icon: MdInsertChartOutlined,
    href: "/pages/dashboard/analytics",
  },
];

interface PostDetailProps {
  avatar: string;
  name: string;
  role: string;
  date: string;
  title: string;
  readTime: string;
  intro: string;
  image: string;
  alt: string;
  footer?: {
    icon: IconType;
    count?: number;
  }[];
}

export const PostDetail: Array<PostDetailProps> = [
  {
    avatar: "",
    name: "Grace Ikpang",
    role: "Product designer",
    date: "May 25th, 2023",
    title: "Starting out as a Product designer",
    readTime: "10 mins read",
    intro:
      "Embarking on a journey as a product designer can be an exhilarating and fulfilling experience. As a profession that bridges the realms of art, technology, and problem-solving, product design offers an opportunity to shape the way people interact with the world around them.",
    image: "/img.jpeg",
    alt: "img",
    footer: [
      {
        icon: IoChatbubblesOutline,
        count: 200,
      },
      {
        icon: SlLike,
        count: 20,
      },
      {
        icon: MdInsertChartOutlined,
        count: 1280,
      },
    ],
  },
];

interface PostHighlightsProps {
  title: string;
  count: string;
}
interface PostDetailProps {
  avatar: string;
  name: string;
  role: string;
  date: string;
  title: string;
  readTime: string;
  intro: string;
  image: string;
  alt: string;
  footer?: {
    icon: IconType;
    count?: number;
  }[];
}

export const PostHighlights: PostHighlightsProps[] = [
  {
    title: "Post",
    count: "3",
  },
  {
    title: "Posts Impressions",
    count: "2.98k",
  },
  {
    title: "Profile visits",
    count: "300",
  },
  {
    title: "New followers",
    count: "299",
  },
];

export const footer = [
  {
    title: "Product",
    child: [
      { item: "Overview", link: "#" },
      { item: "Features", link: "#" },
      { item: "Pricing", link: "#" },
    ],
  },
  {
    title: "Company",
    child: [
      { item: "About", link: "#" },
      { item: "Careers", link: "#" },
      { item: "Contact", link: "#" },
    ],
  },
  {
    title: "Support",
    child: [
      { item: "Terms of Service", link: "#" },
      { item: "Legal", link: "#" },
      { item: "Privacy Policy", link: "#" },
    ],
  },
  {
    title: "Follow Us",
    child: [
      { item: "Facebook", link: "#" },
      { item: "Twitter", link: "#" },
      { item: "LinkedIn", link: "#" },
    ],
  },
];
