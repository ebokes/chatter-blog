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
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { db, storage } from "../lib/firebase";

export interface PostProps {
  uid?: string;
  title?: string;
  bannerImg?: string;
  body?: string;
  category?: string;
  postedOn?: number;
  postLength?: number;
  intro?: string;
  id?: string;
  bookmarks?: string[];
}

export function useAddPost() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  async function addPost(post: PostProps) {
    setLoading(true);
    try {
      const id = uuidv4();
      await setDoc(doc(db, "articles", id), {
        ...post,
        id,
        likes: [],
        bookmarks: [],
      });
      toast({
        title: "Article Published Successfully!",
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
    }
  }

  return { addPost, isLoading };
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

export function useUploadBannerImg(id: string) {
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const toast = useToast();
  const router = useRouter();
  // const navigate = useNavigate();

  async function uploadBannerImg() {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      return;
    }

    setLoading(true);

    const fileRef = ref(storage, "bannerImg/" + id);
    await uploadBytes(fileRef, file);

    const bannerURL = await getDownloadURL(fileRef);

    const docRef = doc(db, "articles", id);
    await updateDoc(docRef, { bannerImg: bannerURL });

    // toast({
    //   title: "Profile updated!",
    //   status: "success",
    //   isClosable: true,
    //   position: "top-right",
    //   duration: 5000,
    // });
    setLoading(false);

    window.location.reload();
  }

  return {
    setFile,
    uploadBannerImg,
    isLoading,
    fileURL: file && URL.createObjectURL(file),
  };
}
