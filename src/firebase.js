import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your Firebase web app config here from Firebase Console > Project settings.
const firebaseConfig = {
  apiKey: "AIzaSyBG17kdyC0d7MpYYnZPbPcoshILBsrNh6Y",
  authDomain: "react-authentication-dem-da263.firebaseapp.com",
  projectId: "react-authentication-dem-da263",
  storageBucket: "react-authentication-dem-da263.firebasestorage.app",
  messagingSenderId: "1034307243199",
  appId: "1:1034307243199:web:ea3c555610831f1c054a0a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
