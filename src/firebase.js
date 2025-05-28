// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjF6Bc_WpY8w4RguzzPa_kILGIyEpv5VQ",
  authDomain: "event-photos-beige.firebaseapp.com",
  projectId: "event-photos-beige",
  storageBucket: "event-photos-beige.appspot.com",
  messagingSenderId: "1077793789573",
  appId: "1:1077793789573:web:864d6ecfc006af728e7bec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Storage and Firestore
export const storage = getStorage(app);
export const db = getFirestore(app);
