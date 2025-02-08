// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeFsCbIey3oEnGr0BpDxkHpbS6mWeTPqw",
  authDomain: "hackathon-3b028.firebaseapp.com",
  projectId: "hackathon-3b028",
  storageBucket: "hackathon-3b028.firebasestorage.app",
  messagingSenderId: "88868740361",
  appId: "1:88868740361:web:375e119a3859c867c907d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);