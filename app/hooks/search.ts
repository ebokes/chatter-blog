import "firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../lib/firebase";

interface User {
  id?: string;
  displayName?: string;
}

interface Post {
  id?: string;
  title?: string;
}

export const useSearchFirebase = (searchTerm: string) => {
  const u = query(
    collection(db, "users"),
    where("displayName", ">=", searchTerm)
  );
  const [users] = useCollectionData<User>(u);

  const p = query(collection(db, "articles"), where("title", ">=", searchTerm));
  const [posts] = useCollectionData<Post>(p);

  return { users, posts };
};
