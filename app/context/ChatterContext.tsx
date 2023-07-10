"use client";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { createContext, useState } from "react";
import { auth, db, provider } from "../lib/firebase";

export const ChatterContext = createContext<{
  entry: Entry;
  setEntry: React.Dispatch<React.SetStateAction<Entry>>;
  handleUserAuth: React.Dispatch<React.SetStateAction<Users | any>>;
  googleUser: null | any;
}>({
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

export interface Posts {
  id: string;
  data: {
    author: string;
    title: string;
    role: string;
    postedOn: number;
    category: string;
    bannerImg: string;
    body: string;
    postLength: number;
    intro: string;
  };
}

export interface Users {
  id?: string;
  // username?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email?: string;
  joiningAs?: string;
  avatar?: string;
  date?: string;
}

interface Entry {
  title: string;
  bannerImg: string;
  body: string;
  category: string;
  postedOn: number;
  postLength: number;
  intro: string;
}

export const ChatterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [entry, setEntry] = useState<Entry>({
    title: "",
    bannerImg: "",
    body: "",
    category: "",
    postedOn: Date.now(),
    postLength: 0,
    intro: "",
  });
  const [googleUser, setGoogleUser] = useState<any>(null);

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
      }}
    >
      {children}
    </ChatterContext.Provider>
  );
};
