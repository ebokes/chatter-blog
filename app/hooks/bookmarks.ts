import {
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
  orderBy,
  query,
  collection,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { uuidv4 } from "@firebase/util";
import { db } from "../lib/firebase";

interface ToggleBookmarkProps {
  uid: string;
  isBookmarked: boolean;
  id: string;
}

export function useToggleBookmark({
  id,
  isBookmarked,
  uid,
}: ToggleBookmarkProps) {
  const [isLoading, setLoading] = useState(false);

  async function toggleBookmark() {
    setLoading(true);

    const docRef = doc(db, "articles", id);
    await updateDoc(docRef, {
      bookmarks: isBookmarked ? arrayRemove(uid) : arrayUnion(uid),
    });

    const bmkId = uuidv4();
    const bookmarkDocRef = doc(db, "bookmarks", bmkId);
    if (isBookmarked) {
      await deleteDoc(bookmarkDocRef);
    } else {
      const bookmarkData = { postId: id, uid, bmkId, date: Date.now() };
      await setDoc(bookmarkDocRef, bookmarkData, { merge: true });
    }

    setLoading(false);
  }

  return { toggleBookmark, isLoading };
}

export function useBookmarkedPosts(uid: string | null = null) {
  const q = query(
    collection(db, "bookmarks"),
    where("uid", "==", uid),
    orderBy("date", "desc")
  );

  const [userBookmarks, isLoading, error] = useCollectionData(q);
  if (error) throw error;

  return { userBookmarks, isLoading };
}
