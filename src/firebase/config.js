// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
const firebaseConfig = 
{
  apiKey: "AIzaSyAAQ0PPrOd1MtlTDjc9sMFwsQj4VgVMbGE",
  authDomain: "tp-react-js-josepaz.firebaseapp.com",
  projectId: "tp-react-js-josepaz",
  storageBucket: "tp-react-js-josepaz.firebasestorage.app",
  messagingSenderId: "452740120167",
  appId: "1:452740120167:web:170c17f4390faa3eca5ec2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
const db = getFirestore(app)  // Export the database for components to use.

const auth = getAuth(app) // Export the authentication for components to use.

export { db, auth }

