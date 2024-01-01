// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore,initializeFirestore,persistentLocalCache,persistentMultipleTabManager,CACHE_SIZE_UNLIMITED } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvQHXabYkfhdMMqQzmcKa7AOzVJ8tu4qM",
  authDomain: "inventory-radar-frc.firebaseapp.com",
  projectId: "inventory-radar-frc",
  storageBucket: "inventory-radar-frc.appspot.com",
  messagingSenderId: "640999917257",
  appId: "1:640999917257:web:042c4f39c26f3d13c0af18",
  measurementId: "G-H4ZXY0PQ00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)