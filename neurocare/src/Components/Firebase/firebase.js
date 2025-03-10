// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx0fN83H8VZX-QOGZ7qPfhr-jm-wSVRbw",
  authDomain: "neurocare-29244.firebaseapp.com",
  projectId: "neurocare-29244",
  storageBucket: "neurocare-29244.firebasestorage.app",
  messagingSenderId: "843251079990",
  appId: "1:843251079990:web:b9e867d0170c06ae6f3197"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db =  getFirestore(app);
export default app;