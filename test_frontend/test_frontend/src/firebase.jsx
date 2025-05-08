// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByrEM0qwxGuv9jAnTfBNT2b1Q8tsqdZIo",
  authDomain: "eventflow-92e6a.firebaseapp.com",
  projectId: "eventflow-92e6a",
  storageBucket: "eventflow-92e6a.appspot.com",
  messagingSenderId: "502603287577",
  appId: "1:502603287577:web:b207d715f10b0c64416e88"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
