// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAg8K7nqfog5VaXlSMr4_SA932B8go4JQ4",
    authDomain: "interviewprep-ai-7a261.firebaseapp.com",
    projectId: "interviewprep-ai-7a261",
    storageBucket: "interviewprep-ai-7a261.firebasestorage.app",
    messagingSenderId: "830682851430",
    appId: "1:830682851430:web:6a5e9d8be1683cedeae5a7",
    measurementId: "G-GKNENRQPRC"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
const db = getFirestore(app);