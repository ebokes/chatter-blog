import {
  doc,
  getDoc,
  arrayRemove,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

import { useEffect, useState } from "react";

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

export function useToggleFollowMe({ id, isFollowMe, uid }: ToggleFollowProps) {
  const [followMeLoading, setLoading] = useState(false);

  async function toggleFollowMe() {
    setLoading(true);

    const docRef = doc(db, "users", id);
    await updateDoc(docRef, {
      follows: isFollowMe ? arrayRemove(uid) : arrayUnion(uid),
    });
    setLoading(false);
  }

  return { toggleFollowMe, followMeLoading };
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
