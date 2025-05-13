// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/cordova";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhrZhXJLYHeVt8XH-tHmYX9O4dWrXAlns",
  authDomain: "real-time-collaborative.firebaseapp.com",
  projectId: "real-time-collaborative",
  storageBucket: "real-time-collaborative.firebasestorage.app",
  messagingSenderId: "350778417291",
  appId: "1:350778417291:web:77bf6817df809d1db0b48e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);