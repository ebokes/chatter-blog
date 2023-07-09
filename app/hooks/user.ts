import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db, storage } from "../lib/firebase";

export interface UserData {
  displayName?: string;
  avatar?: string;
  email?: string;
  username?: string;
  uid?: string;
  date?: number;
  role?: string;
  bio?: string;
  likes?: string[];
  id?: string;
  followMe?: string[];
  iFollow?: string[];
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

interface ToggleFollowProps {
  id: string;
  isFollowMe: boolean;
  uid: string;
}

// export function useToggleFollowMe({ id, isFollowMe, uid }: ToggleFollowProps) {
//   const [followMeLoading, setLoading] = useState(false);

//   async function toggleFollowMe() {
//     setLoading(true);

//     const docRef = doc(db, "users", id);
//     await updateDoc(docRef, {
//       followMe: isFollowMe ? arrayRemove(uid) : arrayUnion(uid),
//     });
//     setLoading(false);
//   }

//   return { toggleFollowMe, followMeLoading };
// }

export function useUsers() {
  const [users, isLoading] = useCollectionData(collection(db, "users"));
  return { users, isLoading };
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

// export function useUpdateProfile(uid: string) {}
