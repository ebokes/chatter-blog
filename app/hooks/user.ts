// import {
//   useCollectionData,
//   useDocumentData,
// } from "react-firebase-hooks/firestore";
// import { db, storage } from "../lib/firebase";
// import { collection, doc, query, updateDoc } from "firebase/firestore";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useToast } from "@chakra-ui/react";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// import { query, doc, DocumentData, useDocumentData } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

import { useEffect, useState } from "react";

export interface UserData {
  displayName: string;
  avatar: string;
  email: string;
  username: string;
  uid: string;
  date: number;
  role: string;
  bio: string;
  likes: string[];
  id: string;
}

interface UserHookResult {
  user: UserData | null;
  isLoading: boolean;
}

export function useUser(id: string): UserHookResult {
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data() as UserData;
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { user, isLoading };
}

// export function useUsers() {
//   const [users, isLoading] = useCollectionData(collection(db, "users"));
//   return { users, isLoading };
// }

// export function useUpdateAvatar(uid) {
//   const [isLoading, setLoading] = useState(false);
//   const [file, setFile] = useState(null);
//   const toast = useToast();
//   const navigate = useNavigate();

//   async function updateAvatar() {
//     if (!file) {
//       toast({
//         title: "No file selected",
//         description: "Please select a file to upload",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "top",
//       });

//       return;
//     }

//     setLoading(true);

//     const fileRef = ref(storage, "avatars/" + uid);
//     await uploadBytes(fileRef, file);

//     const avatarURL = await getDownloadURL(fileRef);

//     const docRef = doc(db, "users", uid);
//     await updateDoc(docRef, { avatar: avatarURL });

//     toast({
//       title: "Profile updated!",
//       status: "success",
//       isClosable: true,
//       position: "top",
//       duration: 5000,
//     });
//     setLoading(false);

//     navigate(0);
//   }

//   return {
//     setFile,
//     updateAvatar,
//     isLoading,
//     fileURL: file && URL.createObjectURL(file),
//   };
// }
