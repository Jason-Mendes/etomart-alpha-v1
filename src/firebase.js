// Import the Firebase modules needed
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Import the firebaseConfig object
import { firebaseConfig } from "./firebase-config"; // Ensure this path is correct

// Initialize Firebase with your project's configuration
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and Authentication
const db = getFirestore(app);
const auth = getAuth(app);

// Export the initialized services so you can use them throughout your application
export { db, auth };
