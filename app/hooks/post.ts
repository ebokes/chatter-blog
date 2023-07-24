"use client";

import { useToast } from "@chakra-ui/react";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { uuidv4 } from "@firebase/util";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { db, storage } from "../lib/firebase";

export interface PostProps {
  uid?: string;
  title?: string;
  bannerImg?: File | string | null;
  body?: string;
  category?: string;
  postedOn?: number | Date;
  postLength?: number;
  intro?: string;
  id?: string;
  bookmarks?: string[];
}
type FileURL = string | undefined;

interface UseAddSavePostResult {
  isLoading: boolean;
  isDraftLoading: boolean;
  fileURL: FileURL;
  setFile: (file: File | null) => void;
  addSavePost: (post: PostProps, isSave: boolean) => void;
}

export function useAddSavePost(): UseAddSavePostResult {
  const [isLoading, setLoading] = useState(false);
  const [isDraftLoading, setDraftLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const toast = useToast();

  async function addSavePost(post: PostProps, isSave: boolean) {
    isSave ? setDraftLoading(true) : setLoading(true);

    try {
      const id = uuidv4();
      if (file) {
        const fileRef = ref(storage, "bannerImg/" + Date.now());
        await uploadBytes(fileRef, file);
        const bannerURL = await getDownloadURL(fileRef);
        post.bannerImg = bannerURL;
      }

      await setDoc(doc(db, isSave ? "drafts" : "articles", id), {
        ...post,
        id,
        likes: [],
        bookmarks: [],
      });

      toast({
        title: isSave
          ? "Article Saved to Drafts!"
          : "Article Published Successfully!",
        status: "success",
        isClosable: true,
        position: "top-right",
        duration: 5000,
      });
      window.location.reload();
    } catch (error: any) {
      toast({
        title: "An error occurred",
        // description: error.message,
        status: "error",
        isClosable: true,
        position: "top-right",
        duration: 5000,
      });
    } finally {
      setLoading(false);
      setDraftLoading(false);
    }
  }

  const fileURL: FileURL = file ? URL.createObjectURL(file) : undefined;

  return {
    isLoading,
    isDraftLoading,
    fileURL,
    setFile,
    addSavePost,
  };
}

export function usePost(id: string) {
  const q = doc(db, "articles", id);
  const [post, isLoading] = useDocumentData(q);

  return { post, isLoading };
}

export function usePostsUid(uid: string | null = null) {
  const q = query(
    collection(db, "articles"),
    orderBy("postedOn", "desc"),
    where("uid", "==", uid)
  );

  const [posts, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { posts, isLoading };
}

// To fetch a collection of posts from all users
export function usePosts() {
  const q = query(collection(db, "articles"), orderBy("postedOn", "desc"));
  const [posts, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { posts, isLoading };
}

interface ToggleLikeProps {
  id: string;
  isLiked: boolean;
  uid: string;
}

// Toggle like on selected post
export function useToggleLike({ id, isLiked, uid }: ToggleLikeProps) {
  const [isLoading, setLoading] = useState(false);

  async function toggleLike() {
    setLoading(true);
    try {
      const docRef = doc(db, "articles", id);
      await updateDoc(docRef, {
        likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
      });
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return { toggleLike, isLoading };
}

// Delete selected post created by logged-in user
export function useDeletePost(id: string) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function deletePost() {
    const res = window.confirm("Are you sure you want to delete this post?");

    if (res) {
      setLoading(true);

      // Delete post document
      await deleteDoc(doc(db, "articles", id));

      // Delete comments
      const q = query(collection(db, "comments"), where("postID", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => deleteDoc(doc.ref));

      toast({
        title: "Post deleted!",
        status: "info",
        isClosable: true,
        position: "top-right",
        duration: 5000,
      });

      setLoading(false);
    }
  }

  return { deletePost, isLoading };
}

// To fetch a collection of draft by logged-in user
export function useDrafts(uid: string | null = null) {
  const q = query(
    collection(db, "drafts"),
    orderBy("postedOn", "desc"),
    where("uid", "==", uid)
  );

  const [posts, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { posts, isLoading };
}

// To fetch a single post category
export function usePostCategory(category: string) {
  const q = query(
    collection(db, "articles"),
    orderBy("postedOn", "desc"),
    where("category", "==", category)
  );
  const [postCategory, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { postCategory, isLoading };
}
