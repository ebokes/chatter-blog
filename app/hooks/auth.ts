// // import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
// // import { auth, db } from "../lib/firebase";
// // import {
// //   signInWithEmailAndPassword,
// //   createUserWithEmailAndPassword,
// // } from "firebase/auth";
// // import { useToast } from "@chakra-ui/react";
// // import { useNavigate } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import { DASHBOARD, LOGIN } from "../App";
// // import isUsernameExists from "../utils/IsUsernameExist";
// // import { doc, getDoc, setDoc } from "firebase/firestore";

import { useToast } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import Error from "next/error";

// import { useToast } from "@chakra-ui/react";
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { useState, useEffect } from "react";
// import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
// import { auth, db } from "../lib/firebase";

// export function useAuth() {
//   const [authUser, authLoading, error] = useAuthState(auth);
//   const [isLoading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       setLoading(true);
//       const ref = doc(db, "users", authUser.uid);
//       const docSnap = await getDoc(ref);
//       setUser(docSnap.data());
//       setLoading(false);
//     }

//     if (!authLoading) {
//       if (authUser) fetchData();
//       else setLoading(false); // Not signed in
//     }
//   }, [authLoading]);

//   return { user, isLoading, error };
// }

interface SignInProps {
  email: string;
  password: string;
  redirectTo: string;
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
        title: "You are logged in",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      router.push(redirectTo);
    } catch (error: any) {
      toast({
        title: "Logging in failed",
        description: error.message,
        status: "error",
        isClosable: true,
        position: "top",
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

// export function useRegister() {
//   const [isLoading, setLoading] = useState(false);
//   const toast = useToast();
//   const navigate = useNavigate();

//   async function register({
//     username,
//     email,
//     password,
//     redirectTo = DASHBOARD,
//   }) {
//     setLoading(true);

//     const usernameExists = await isUsernameExists(username);

//     if (usernameExists) {
//       toast({
//         title: "Username already exists",
//         status: "error",
//         isClosable: true,
//         position: "top",
//         duration: 5000,
//       });
//       setLoading(false);
//     } else {
//       try {
//         const res = await createUserWithEmailAndPassword(auth, email, password);

//         await setDoc(doc(db, "users", res.user.uid), {
//           id: res.user.uid,
//           username: username.toLowerCase(),
//           avatar: "",
//           date: Date.now(),
//         });

//         toast({
//           title: "Account created",
//           description: "You are logged in",
//           status: "success",
//           isClosable: true,
//           position: "top",
//           duration: 5000,
//         });

//         navigate(redirectTo);
//       } catch (error) {
//         toast({
//           title: "Signing Up failed",
//           description: error.message,
//           status: "error",
//           isClosable: true,
//           position: "top",
//           duration: 5000,
//         });
//       } finally {
//         setLoading(false);
//       }
//     }
//   }

//   return { register, isLoading };
// }

// export function useLogout() {
//   const [signOut, isLoading, error] = useSignOut(auth);
//   const toast = useToast();
//   const navigate = useNavigate();

//   async function logout() {
//     if (await signOut()) {
//       toast({
//         title: "Successfully logged out",
//         status: "success",
//         isClosable: true,
//         position: "top",
//         duration: 5000,
//       });
//       navigate(LOGIN);
//     } // else: show error [signOut() returns false if failed]
//   }

//   return { logout, isLoading };
// }
