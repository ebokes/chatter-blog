import { Metadata } from "next";
import SignInPage from "./SignInPage";

export const metadata: Metadata = {
  title: "Sign In to Chatter",
  description: "Log in to access your account and manage your blog on Chatter",
};

const page = () => {
  return <SignInPage />;
};

export default page;
