"use client";

import { useToast } from "@chakra-ui/react";
import { uuidv4 } from "@firebase/util";
import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../lib/firebase";

export interface Comment {
  id?: string;
  text?: string;
  postID?: string;
  date?: number;
  uid?: string;
}

export function useAddComment({
  postID,
  uid,
}: {
  postID: string;
  uid: string;
}) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function addComment(text: string) {
    setLoading(true);
    try {
      const id = uuidv4();
      const date = Date.now();
      const docRef = doc(db, "comments", id);
      await setDoc(docRef, { text, id, postID, date, uid });

      toast({
        title: "Comment added!",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
    } catch (error: any) {
      toast({
        title: "An error occurred",
        description: error.message,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  }

  return { addComment, isLoading };
}

export function useComments(postID: string) {
  const q = query(
    collection(db, "comments"),
    where("postID", "==", postID),
    orderBy("date", "asc")
  );
  const [comments, isLoading, error] = useCollectionData<Comment>(q);
  if (error) throw error;

  return { comments, isLoading };
}

export function useDeleteComment(id: string) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function deleteComment() {
    const res = window.confirm("Are you sure you want to delete this comment?");

    if (res) {
      setLoading(true);
      const docRef = doc(db, "comments", id);
      await deleteDoc(docRef);
      toast({
        title: "Comment deleted!",
        status: "info",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
    }
  }

  return { deleteComment, isLoading };
}
