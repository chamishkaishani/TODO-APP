// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "garage-management-system-35c3a.firebaseapp.com",
  projectId: "garage-management-system-35c3a",
  storageBucket: "garage-management-system-35c3a.appspot.com",
  messagingSenderId: "458738431212",
  appId: "1:458738431212:web:4f72c748ffa1de892321c9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);