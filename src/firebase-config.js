// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCIngTMFV9T1ZKZnscDNS1nMgUysLT-T8o",
  authDomain: "etomart-81004.firebaseapp.com",
  projectId: "etomart-81004",
  storageBucket: "etomart-81004.appspot.com",
  messagingSenderId: "237788798543",
  appId: "1:237788798543:web:453183f1ffdc7e475b143a",
  measurementId: "G-35N89F4SEE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);