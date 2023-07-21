import { db } from "@/app/lib/firebase";
import PostPage from "./PostPage";
import {
  getDoc,
  doc,
  DocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { Metadata } from "next";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const docRef = doc(db, "articles", id);
  const postSnapshot: DocumentSnapshot<DocumentData> = await getDoc(docRef);
  const post = postSnapshot.data();

  return {
    title: post?.title,
    description: post?.intro,
  };
}

const Post = () => {
  return <PostPage />;
};

export default Post;
