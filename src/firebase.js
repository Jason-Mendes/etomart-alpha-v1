// Import additional services as needed

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/firebase-auth';
import { firebaseConfig } from 'firebase/firebase-config';
const app = initializeApp(appConfig);
// Initialize Cloud Firestore through Firebase (using v9)
const db = getFirestore(app);
const auth = getAuth(app);
// Export other services as needed so you can use them throughout your application.
export { db, auth };