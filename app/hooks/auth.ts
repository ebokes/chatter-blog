import { useToast } from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { DocumentData, doc, getDoc, setDoc } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth, db } from "../lib/firebase";

interface SignUpProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  joiningAs: string;
  redirectTo: string;
  followMe: string[];
  iFollow: string[];
}
interface SignInProps {
  email: string;
  password: string;
  redirectTo: string;
}

export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<DocumentData | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (authUser) {
        const ref = doc(db, "users", authUser.uid);
        const docSnap = await getDoc(ref);
        setUser(docSnap.data() as DocumentData);
      }
      setLoading(false);
    }

    if (!authLoading) {
      if (authUser) fetchData();
      else setLoading(false); // Not signed in
    }
  }, [authLoading, authUser]);

  return { user, isLoading, error };
}

export function useLogin() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  async function login({
    email,
    password,
    redirectTo = "/pages/dashboard",
  }: SignInProps) {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Login successful",
        status: "success",
        isClosable: true,
        position: "top-right",
        duration: 5000,
      });
      router.push(redirectTo);
    } catch (error: any) {
      toast({
        title: "Logging in failed",
        description: "Wrong email or password",
        status: "error",
        isClosable: true,
        position: "top-right",
        duration: 5000,
      });
      setLoading(false);
      return false; // Return false if login failed
    }
    setLoading(false);

    return true; // Return true if login succeeded
  }

  return { login, isLoading };
}

export function useRegister() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  async function register(details: SignUpProps) {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        details.email,
        details.password
      );

      await setDoc(doc(db, "users", res.user.uid), {
        id: res.user.uid,
        ...details,
        displayName: details.firstName + " " + details.lastName,
        avatar: "",
        date: Date.now(),
      });

      toast({
        title: "Account created successfully",
        description: "We've created your account for you.",
        status: "success",
        isClosable: true,
        position: "top-right",
        duration: 5000,
      });

      router.push(details.redirectTo);
    } catch (error: any) {
      toast({
        title: "Signing Up failed",
        description: error.message,
        status: "error",
        isClosable: true,
        position: "top-right",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
    // }
  }

  return { register, isLoading };
}

export function useLogout() {
  const [signOut, isLoading, error] = useSignOut(auth);
  const toast = useToast();
  const router = useRouter();

  async function logout() {
    if (await signOut()) {
      toast({
        title: "Successfully logged out",
        status: "success",
        isClosable: true,
        position: "top-right",
        duration: 5000,
      });
      router.push("/");
    } else {
      toast({
        title: "Logout failed",
        // description: error.message,
        status: "error",
        isClosable: true,
        position: "top-right",
        duration: 5000,
      });
    } // else: show error [signOut() returns false if failed]
  }

  return { logout, isLoading };
}
