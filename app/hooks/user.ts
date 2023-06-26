// import {
//   useCollectionData,
//   useDocumentData,
// } from "react-firebase-hooks/firestore";
// import { db, storage } from "../lib/firebase";
// import { collection, doc, query, updateDoc } from "firebase/firestore";
// import { useState } from "react";
// import { useToast } from "@chakra-ui/react";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { useRouter } from "next/router";

// export function useUser(id: string) {
//   const q = query(doc(db, "users", id));
//   const [user, isLoading] = useDocumentData(q);
//   return { user, isLoading };
// }

// export function useUsers() {
//   const [users, isLoading] = useCollectionData(collection(db, "users"));
//   return { users, isLoading };
// }

// export function useUpdateAvatar(uid: string) {
//   const [isLoading, setLoading] = useState(false);
//   const [file, setFile] = useState<File | null>(null);
//   const toast = useToast();
//   const router = useRouter();

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

//     router.push(0);
//   }

//   return {
//     setFile,
//     updateAvatar,
//     isLoading,
//     fileURL: file && URL.createObjectURL(file),
//   };
// }
