import { useToast } from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { DocumentData, doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth, db, provider } from "../lib/firebase";

interface SignUpProps {
  // username: string;
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

export function useGoogleAuth() {
  const [isLoading, setLoading] = useState(false);
  const [googleUser, setGoogleUser] = useState<any>(null);
  const toast = useToast();
  const router = useRouter();

  setLoading(true);

  try {
    // const res = await signInWithPopup(auth, provider);
    const addUserToFirebase = async (user: any) => {
      await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        // username: user.email.split("@")[0],
        firstName: user.displayName.split(" ")[0],
        lastName: user.displayName.split(" ")[1],
        displayName: user.displayName,
        email: user.email,
        joiningAs: "writer",
        avatar: user.photoURL,
        followMe: [],
        iFollow: [],
        date: Date.now(),
      });
    };

    const signInWithGoogle = async () => {
      const res = await signInWithPopup(auth, provider);
      const userData = res.user;
      setGoogleUser(userData);
      addUserToFirebase(userData);
    };

    toast({
      title: "Login successful",
      status: "success",
      isClosable: true,
      position: "top-right",
      duration: 5000,
    });
    router.push("/pages/dashboard");
  } catch (error: any) {
    toast({
      title: "Signing in failed",
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

  return { googleUser, isLoading };
}

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
