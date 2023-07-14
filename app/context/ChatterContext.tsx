"use client";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { createContext, useState } from "react";
import { auth, db, provider } from "../lib/firebase";
import { UserDataProps } from "../hooks/user";
import { PostProps } from "../hooks/post";

export const ChatterContext = createContext<{
  entry: PostProps;
  setEntry: React.Dispatch<React.SetStateAction<PostProps>>;
  handleUserAuth: React.Dispatch<React.SetStateAction<UserDataProps | any>>;
  searchResults: [] | any;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string | any>>;
  setSearchResults: React.Dispatch<React.SetStateAction<[] | any>>;
  googleUser: null | any;
}>({
  searchResults: [],
  searchTerm: "",
  setSearchTerm: () => "",
  setSearchResults: () => [],
  googleUser: null,
  handleUserAuth: () => {},
  entry: {
    title: "",
    bannerImg: "",
    body: "",
    category: "",
    postedOn: Date.now(),
    postLength: 0,
    intro: "",
  },
  setEntry: () => {},
});

export const ChatterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [entry, setEntry] = useState<PostProps>({
    title: "",
    bannerImg: "",
    body: "",
    category: "",
    postedOn: Date.now(),
    postLength: 0,
    intro: "",
  });
  const [googleUser, setGoogleUser] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<PostProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const addUserToFirebase = async (user: any) => {
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      firstName: user.displayName.split(" ")[0],
      lastName: user.displayName.split(" ")[1],
      displayName: user.displayName,
      email: user.email,
      joiningAs: "writer",
      avatar: user.photoURL,
      followMe: [],
      iFollow: [],
      date: Date.now(),
    });
  };

  const handleUserAuth = async () => {
    const userResponse = await signInWithPopup(auth, provider);
    const userData = userResponse.user;
    setGoogleUser(userData);
    addUserToFirebase(userData);
  };

  return (
    <ChatterContext.Provider
      value={{
        entry,
        setEntry,
        googleUser,
        handleUserAuth,
        searchResults,
        setSearchResults,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </ChatterContext.Provider>
  );
};
