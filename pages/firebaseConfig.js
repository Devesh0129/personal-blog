import { initializeApp , getApps, getApp  } from "firebase/app";
import { getAuth } from "firebase/auth";  // For authentication
import { getFirestore } from "firebase/firestore"; // For database

// Firebase configuration from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyARyv0fTY3w517NqBLZh2Cn6ZfmFHoTYsE",
  authDomain: "personal-blog-2901.firebaseapp.com",
  databaseURL: "https://personal-blog-2901-default-rtdb.firebaseio.com",
  projectId: "personal-blog-2901",
  storageBucket: "personal-blog-2901.firebasestorage.app",
  messagingSenderId: "228899809044",
  appId: "1:228899809044:web:dfe764b203dee24cd8c401",
  measurementId: "G-TS8BKSXH9E"
};

// Initialize Firebase only if it's not already initialized
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); // If app is already initialized, use it
}

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
