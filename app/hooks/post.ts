// // import { useToast } from "@chakra-ui/react";
// // import { uuidv4 } from "@firebase/util";
// // import {
// //   arrayRemove,
// //   arrayUnion,
// //   collection,
// //   deleteDoc,
// //   doc,
// //   getDocs,
// //   orderBy,
// //   query,
// //   setDoc,
// //   updateDoc,
// //   where,
// // } from "firebase/firestore";
// // import {
// //   useCollectionData,
// //   useDocumentData,
// // } from "react-firebase-hooks/firestore";
// // import { db } from "../lib/firebase";
// // import { useState } from "react";

// // export function useAddPost() {
// //   const [isLoading, setLoading] = useState(false);
// //   const toast = useToast();

// //   async function addPost(post) {
// //     setLoading(true);
// //     const id = uuidv4();
// //     await setDoc(doc(db, "posts", id), {
// //       ...post,
// //       id,
// //       date: Date.now(),
// //       likes: [],
// //     });
// //     toast({
// //       title: "Post added successfully!",
// //       status: "success",
// //       isClosable: true,
// //       position: "top",
// //       duration: 5000,
// //     });
// //     setLoading(false);
// //   }

// //   return { addPost, isLoading };
// // }

// // export function usePost(id) {
// //   const q = doc(db, "posts", id);
// //   const [post, isLoading] = useDocumentData(q);

// //   return { post, isLoading };
// // }

// // export function usePosts(uid = null) {
// //   const q = uid
// //     ? query(
// //         collection(db, "posts"),
// //         orderBy("date", "desc"),
// //         where("uid", "==", uid)
// //       )
// //     : query(collection(db, "posts"), orderBy("date", "desc"));
// //   const [posts, isLoading, error] = useCollectionData(q);
// //   if (error) throw error;
// //   return { posts, isLoading };
// // }

// // export function useToggleLike({ id, isLiked, uid }) {
// //   const [isLoading, setLoading] = useState(false);

// //   async function toggleLike() {
// //     setLoading(true);
// //     const docRef = doc(db, "posts", id);
// //     await updateDoc(docRef, {
// //       likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
// //     });
// //     setLoading(false);
// //   }

// //   return { toggleLike, isLoading };
// // }

// // export function useDeletePost(id) {
// //   const [isLoading, setLoading] = useState(false);
// //   const toast = useToast();

// //   async function deletePost() {
// //     const res = window.confirm("Are you sure you want to delete this post?");

// //     if (res) {
// //       setLoading(true);

// //       // Delete post document
// //       await deleteDoc(doc(db, "posts", id));

// //       // Delete comments
// //       const q = query(collection(db, "comments"), where("postID", "==", id));
// //       const querySnapshot = await getDocs(q);
// //       querySnapshot.forEach(async (doc) => deleteDoc(doc.ref));

// //       toast({
// //         title: "Post deleted!",
// //         status: "info",
// //         isClosable: true,
// //         position: "top",
// //         duration: 5000,
// //       });

// //       setLoading(false);
// //     }
// //   }

// //   return { deletePost, isLoading };
// // }

// import { useToast } from "@chakra-ui/react";
// // import { v4 as uuidv4 } from "uuid";
// import { uuidv4 } from "@firebase/util";
// import {
//   addDoc,
//   arrayRemove,
//   arrayUnion,
//   collection,
//   deleteDoc,
//   doc,
//   getDocs,
//   orderBy,
//   query,
//   setDoc,
//   updateDoc,
//   where,
// } from "firebase/firestore";
// import {
//   useCollectionData,
//   useDocumentData,
// } from "react-firebase-hooks/firestore";
// import { db } from "../lib/firebase";
// import { useState } from "react";

// interface Post {
//   id: string;
//   uid: string;
//   title: string;
//   date: number;
//   likes: string[];
//   bannerImg: string;
//   body: string;
//   category: string;
// }

// export function useAddPost() {
//   const toast = useToast();
//   const [publishLoading, setPublishLoading] = useState(false);
//   async function addPost(entry: Partial<Post>) {
//     // setPublishLoading(true);
//     console.log("entry", entry);
//     e.preventDefault();
//     try {
//       const id = uuidv4();
//       const articlesRef = collection(db, "articles", id);
//       await addDoc(articlesRef, entry);
//       toast({
//         title: "Article Published Successfully!",
//         // description: "Your article has been .",
//         status: "success",
//         isClosable: true,
//         position: "top-right",
//         duration: 5000,
//       });
//       //   setPublishLoading(false);
//       console.log("Article Published Successfully!");
//     } catch (error) {
//       toast({
//         title: "Error Publishing Article",
//         // description: "We've created your account for you.",
//         status: "success",
//         isClosable: true,
//         position: "top-right",
//         duration: 5000,
//       });
//       console.error("Error creating article:", error);
//     }
//   }

//   // useEffect(() => {
//   //   // Cleanup or other side effects
//   //   return () => {
//   //     // Cleanup code here
//   //   };
//   // }, []);

//   return { addPost, publishLoading };
// }

// // export function useAddPost() {
// //   const [isLoading, setLoading] = useState(false);
// //   const toast = useToast();

// //   async function addPost(post: Partial<Post>) {
// //     setLoading(true);

// //     const id = uuidv4();
// //     await addDoc(collection(db, "posts", id), {
// //       ...post,
// //       id,
// //       //   postedOn: Date.now(),
// //       //   //   likes: [],
// //       //   title: "",
// //       //   bannerImg: "",
// //       //   body: "",
// //       //   category: "",

// //       title: "",
// //       bannerImg: "",
// //       body: "",
// //       category: "",
// //       postedOn: "",
// //       postLength: 0,
// //       tags: [],
// //     });
// //     toast({
// //       title: "Post added successfully!",
// //       status: "success",
// //       isClosable: true,
// //       position: "top",
// //       duration: 5000,
// //     });
// //     setLoading(false);
// //   }

// //   return { addPost, isLoading };
// // }

// // export function usePost(id: string) {
// //   const q = doc(db, "posts", id);
// //   const [post, isLoading] = useDocumentData<Post>(q);

// //   return { post, isLoading };
// // }

// // export function usePosts(uid: string | null = null) {
// //   const q = uid
// //     ? query(
// //         collection(db, "posts"),
// //         orderBy("date", "desc"),
// //         where("uid", "==", uid)
// //       )
// //     : query(collection(db, "posts"), orderBy("date", "desc"));
// //   const [posts, isLoading, error] = useCollectionData<Post>(q);
// //   if (error) throw error;
// //   return { posts, isLoading };
// // }

// // export function useToggleLike({
// //   id,
// //   isLiked,
// //   uid,
// // }: {
// //   id: string;
// //   isLiked: boolean;
// //   uid: string;
// // }) {
// //   const [isLoading, setLoading] = useState(false);

// //   async function toggleLike() {
// //     setLoading(true);
// //     const docRef = doc(db, "posts", id);
// //     await updateDoc(docRef, {
// //       likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
// //     });
// //     setLoading(false);
// //   }

// //   return { toggleLike, isLoading };
// // }

// // export function useDeletePost(id: string) {
// //   const [isLoading, setLoading] = useState(false);
// //   const toast = useToast();

// //   async function deletePost() {
// //     const res = window.confirm("Are you sure you want to delete this post?");

// //     if (res) {
// //       setLoading(true);

// //       // Delete post document
// //       await deleteDoc(doc(db, "posts", id));

// //       // Delete comments
// //       const q = query(collection(db, "comments"), where("postID", "==", id));
// //       const querySnapshot = await getDocs(q);
// //       querySnapshot.forEach(async (doc) => deleteDoc(doc.ref));

// //       toast({
// //         title: "Post deleted!",
// //         status: "info",
// //         isClosable: true,
// //         position: "top",
// //         duration: 5000,
// //       });

// //       setLoading(false);
// //     }
// //   }

// //   return { deletePost, isLoading };
// // }
