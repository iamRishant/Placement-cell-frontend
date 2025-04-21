// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Add this for authentication
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABWhF2K-EImovUFsy6gPfM1xCKhGqhiVY",
  authDomain: "cu-placement-cell.firebaseapp.com",
  projectId: "cu-placement-cell",
  storageBucket: "cu-placement-cell.firebasestorage.app",
  messagingSenderId: "567411459001",
  appId: "1:567411459001:web:ab0acdadaa65044e7aac68",
  measurementId: "G-KX6Q8BWB5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // Export auth for use in other components
export default app;