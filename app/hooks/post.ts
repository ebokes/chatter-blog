import { uuidv4 } from "@firebase/util";
import { useToast } from "@chakra-ui/react";
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
import { useContext, useState } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { ChatterContext } from "../context/ChatterContext";
import { db } from "../lib/firebase";
import { useRouter } from "next/navigation";

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
}

export function useAddPost() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  // const { setEntry } = useContext(ChatterContext);

  async function addPost(post: PostProps) {
    setLoading(true);
    try {
      const id = uuidv4();
      await setDoc(doc(db, "articles", id), {
        ...post,
        id,
        likes: [],
      });
      toast({
        title: "Article Published Successfully!",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      router.push("/pages/dashboard");
      // setEntry({
      //   title: "",
      //   bannerImg: "",
      //   body: "",
      //   category: "",
      //   postedOn: Date.now(),
      //   postLength: 0,
      //   intro: "",
      // });
    } catch (error: any) {
      toast({
        title: "An error occurred",
        // description: error.message,
        status: "error",
        isClosable: true,
        position: "top",
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

// export function usePosts(uid: string | null = null) {
//   const q = uid
//     ? query(
//         collection(db, "articles"),
//         orderBy("postedOn", "desc"),
//         where("uid", "==", uid)
//       )
//     : query(collection(db, "articles"), orderBy("date", "desc"));
//   const [posts, isLoading, error] = useCollectionData<PostProps>(q);
//   if (error) throw error;
//   return { posts, isLoading };
// }

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

    const docRef = doc(db, "articles", id);
    await updateDoc(docRef, {
      likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
    });
    setLoading(false);
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
        position: "top",
        duration: 5000,
      });

      setLoading(false);
    }
  }

  return { deletePost, isLoading };
}
