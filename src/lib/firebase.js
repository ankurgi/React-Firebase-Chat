import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-firebase-chatapp-ce9d0.firebaseapp.com",
  projectId: "react-firebase-chatapp-ce9d0",
  storageBucket: "react-firebase-chatapp-ce9d0.firebasestorage.app",
  messagingSenderId: "155003516475",
  appId: "1:155003516475:web:fbc66066b80a350510ce1e",
  measurementId: "G-ZYYBRGYYW1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()