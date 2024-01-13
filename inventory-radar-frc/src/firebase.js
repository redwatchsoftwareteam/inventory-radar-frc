// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getFirestore,initializeFirestore,persistentLocalCache,persistentMultipleTabManager,CACHE_SIZE_UNLIMITED } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8JreYpldrn-A2Ci4_Tsi7kxQs0HiwNlI",
  authDomain: "trash-fcca4.firebaseapp.com",
  projectId: "trash-fcca4",
  storageBucket: "trash-fcca4.appspot.com",
  messagingSenderId: "815891699066",
  appId: "1:815891699066:web:f4824291792546cefbf2c3",
  measurementId: "G-PCLLW49Z2R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Use multi-tab IndexedDb persistence.
initializeFirestore(app, 
  {localCache: 
    persistentLocalCache(/*settings*/{tabManager: persistentMultipleTabManager()})
  }, {cacheSizeBytes: CACHE_SIZE_UNLIMITED});


export const db = getFirestore(app)