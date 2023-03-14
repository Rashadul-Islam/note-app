import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbEw4ZSkgPXRYdM-xSnIZhSQfuMtPZGUM",
  authDomain: "note-app-ff6ef.firebaseapp.com",
  projectId: "note-app-ff6ef",
  storageBucket: "note-app-ff6ef.appspot.com",
  messagingSenderId: "338542323831",
  appId: "1:338542323831:web:e223760d68a88802507e72",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
