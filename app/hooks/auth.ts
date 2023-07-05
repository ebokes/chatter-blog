import { useToast } from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db, provider } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { setDoc, doc, getDoc, DocumentData } from "firebase/firestore";
import isUsernameExists from "../utils/isUsernameExists";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { signInWithPopup } from "firebase/auth";

interface SignUpProps {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  joiningAs: string;
  redirectTo: string;
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

  async function register({
    firstName,
    lastName,
    joiningAs,
    username,
    email,
    password,
    redirectTo = "/pages/dashboard",
  }: SignUpProps) {
    setLoading(true);

    const usernameExists = await isUsernameExists(username);

    if (usernameExists) {
      toast({
        title: "Username already exists",
        status: "error",
        isClosable: true,
        position: "top-right",
        duration: 5000,
      });
      setLoading(false);
    } else {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", res.user.uid), {
          id: res.user.uid,
          username: username?.toLowerCase(),
          firstName,
          lastName,
          displayName: firstName + " " + lastName,
          email,
          joiningAs,
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

        router.push(redirectTo);
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
    }
  }

  return { register, isLoading };
}

// export function useGoogleAuth() {
//   const [isLoading, setLoading] = useState(false);
//   const [googleUser, setGoogleUser] = useState<any>(null);
//   const toast = useToast();
//   const router = useRouter();

//   setLoading(true)
//     try {
//       // const res = await signInWithPopup(auth, provider);

//       await setDoc(doc(db, "users", user.uid), {
//         id: user.uid,
//         username: user.email.split("@")[0],
//         firstName: user.displayName.split(" ")[0],
//         lastName: user.displayName.split(" ")[1],
//         displayName: user.displayName,
//         email: user.email,
//         joiningAs: "writer",
//         avatar: user.photoURL,
//         date: Date.now(),
//       });

//       toast({
//         title: "Login successful",
//         status: "success",
//         isClosable: true,
//         position: "top-right",
//         duration: 5000,
//       });

//       router.push("/pages/dashboard");
//     } catch (error: any) {
//       toast({
//         title: "Signing in failed",
//         description: error.message,
//         status: "error",
//         isClosable: true,
//         position: "top-right",
//         duration: 5000,
//       });
//     } finally {
//       setLoading(false);
//     }
//   }

//   return { register, isLoading };
// // }

// export function useGoogleAuth() {
//   const [signInWithGoogle, gUser, gLoading, gError] =
//     useSignInWithGoogle(auth);

//     async function register({

//       useEffect(() => {
//         if (gUser) {
//           router.push("/pages/dashboard");
//         }
//       }, [gUser]);
//     })
//   return { gUser, gLoading, gError, signInWithGoogle };
// // }

// interface Props {}

// export const useGoogle = () => {
//   // const OAuthButtons = (props: Props) => {
//   // const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
//   const [signInWithGoogle, googleUser, googleLoading, error] =
//     useSignInWithGoogle(auth);
//   const toast = useToast();
//   const router = useRouter();

//   useEffect(() => {
//     if (googleUser) {
//       toast({
//         title: "Login successful",
//         status: "success",
//         isClosable: true,
//         position: "top-right",
//         duration: 5000,
//       });
//       router.push("/pages/dashboard");
//     }
//   }, [googleUser, toast, router]);
//   return { signInWithGoogle, googleUser, googleLoading, error };
// };

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
