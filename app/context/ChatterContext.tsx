"use client";
import React, { createContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export const ChatterContext = createContext({
  posts: [] as Posts[],
  users: [] as Users[],
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
    postedOn: string;
    category: string;
    bannerImg: string;
    body: string;
    postLength: number;
    tags: string[];
  };
}
export const ChatterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          data: {
            ...doc.data(),
          },
        };
      });
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, "articles");
      const postsSnapshot = await getDocs(postsCollection);
      const postsList = postsSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          data: {
            author: doc.data().author,
            title: doc.data().title,
            role: doc.data().role,
            postedOn: doc.data().postedOn,
            category: doc.data().category,
            bannerImg: doc.data().bannerImg,
            body: doc.data().body,
            postLength: doc.data().postLength,
            tags: doc.data().tags,
          },
        };
      });
      setPosts(postsList);
    };

    fetchPosts();
  }, []);

  return (
    <ChatterContext.Provider value={{ posts, users }}>
      {children}
    </ChatterContext.Provider>
  );
};
