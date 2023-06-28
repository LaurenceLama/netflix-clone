// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVpBPCs5yaINPD6CLcSFu7zjduCiiqcYE",
  authDomain: "netflix-clone-96cde.firebaseapp.com",
  projectId: "netflix-clone-96cde",
  storageBucket: "netflix-clone-96cde.appspot.com",
  messagingSenderId: "810363876184",
  appId: "1:810363876184:web:b1a05b03a3500e99aeeb2d",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
