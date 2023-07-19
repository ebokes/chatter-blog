import { Metadata } from "next";
import SignUpPage from "./SignUpPage";

export const metadata: Metadata = {
  title: "Sign up for Chatter",
  description:
    "Create an account to join Chatter and start sharing your thoughts, stories, and insights with the community",
};

const page = () => {
  return <SignUpPage />;
};

export default page;
