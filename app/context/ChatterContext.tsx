"use client";
import React, { createContext, useState } from "react";

export const ChatterContext = createContext<{
  entry: Entry;
  setEntry: React.Dispatch<React.SetStateAction<Entry>>;
}>({
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

export interface Users {
  id: string;
  data: { [x: string]: any };
}
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

  return (
    <ChatterContext.Provider
      value={{
        entry,
        setEntry,
      }}
    >
      {children}
    </ChatterContext.Provider>
  );
};
