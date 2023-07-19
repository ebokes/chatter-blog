import { db } from "@/app/lib/firebase";
import ProfilePage from "./ProfilePage";
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
  const docRef = doc(db, "users", id);
  const userSnapshot: DocumentSnapshot<DocumentData> = await getDoc(docRef);
  const user = userSnapshot.data();

  return {
    title: user?.displayName,
    description: user?.bio,
  };
}

const Profile = () => {
  return <ProfilePage />;
};

export default Profile;
