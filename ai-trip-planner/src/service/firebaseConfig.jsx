// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA722sQzsytnMNhhVejoWe8ByFdG89-9nA",
    authDomain: "ai-trip-planner-800bc.firebaseapp.com",
    projectId: "ai-trip-planner-800bc",
    storageBucket: "ai-trip-planner-800bc.firebasestorage.app",
    messagingSenderId: "430870426783",
    appId: "1:430870426783:web:676654393c22160894deaa",
    measurementId: "G-J569J29JBT"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);