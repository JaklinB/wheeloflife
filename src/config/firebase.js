// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5ZvFCrd3cadCYXIIOyXlyAZABKhDweJQ",
  authDomain: "wheeloflife-1f9fa.firebaseapp.com",
  projectId: "wheeloflife-1f9fa",
  storageBucket: "wheeloflife-1f9fa.appspot.com",
  messagingSenderId: "313829928305",
  appId: "1:313829928305:web:bd57eb0483738e995e5ad0",
  measurementId: "G-LWTB33S88E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
