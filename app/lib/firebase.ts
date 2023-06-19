// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZdLS0GxErEtqMzvF4_jNnEtJarsXz78c",
  authDomain: "chatter-76957.firebaseapp.com",
  projectId: "chatter-76957",
  storageBucket: "chatter-76957.appspot.com",
  messagingSenderId: "108030687417",
  appId: "1:108030687417:web:c4639639f16c6e5967c368",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
