"use client";

import { useToast } from "@chakra-ui/react";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db, storage } from "../lib/firebase";

export interface UserDataProps {
  displayName?: string;
  avatar?: string;
  email?: string;
  username?: string;
  uid?: string;
  date?: number;
  role?: string;
  bio?: string;
  id?: string;
  followMe?: string[];
  iFollow?: string[];
}

interface UserHookResult {
  user: UserDataProps | null;
  isLoading: boolean;
}

export function useUser(id: string): UserHookResult {
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState<UserDataProps | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data() as UserDataProps;
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { user, isLoading };
}

export function useUsers() {
  const [users, isLoading] = useCollectionData(collection(db, "users"));
  return { users, isLoading };
}

export function useProfileEdit() {
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();

  const handleUserEdit = async (
    userAuth: DocumentData | null,
    displayName: string,
    username: string,
    bio: string,
    role: string
  ) => {
    setIsEditing(true);
    try {
      if (!userAuth || !userAuth.id) return;

      const userRef = doc(db, "users", userAuth?.id);
      await updateDoc(userRef, {
        displayName,
        username,
        bio,
        role,
      });
      setIsEditing(false);
      toast({
        title: "Profile updated!",
        status: "success",
        isClosable: true,
        position: "top-right",
        duration: 5000,
      });
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error updating user profile",
        status: "error",
        isClosable: true,
        position: "top-right",
        duration: 5000,
      });
    }
  };

  return { isEditing, handleUserEdit };
}

export function useUpdateAvatar(uid: string) {
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  async function updateAvatar() {
    if (!file) {
      return;
    }

    try {
      setLoading(true);

      const fileRef = ref(storage, `avatars/${uid}`);
      await uploadBytes(fileRef, file);

      const avatarURL = await getDownloadURL(fileRef);

      const docRef = doc(db, "users", uid);
      await updateDoc(docRef, { avatar: avatarURL });
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    window.location.reload();
  }

  return {
    setFile,
    updateAvatar,
    isLoading,
    fileURL: file && URL.createObjectURL(file),
  };
}
