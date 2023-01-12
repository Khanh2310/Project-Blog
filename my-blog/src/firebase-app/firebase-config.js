import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCDbuxEYyDzlJ0s-JGIh_heMtFD0ybKThs",
  authDomain: "blogging-f1d31.firebaseapp.com",
  projectId: "blogging-f1d31",
  storageBucket: "blogging-f1d31.appspot.com",
  messagingSenderId: "1017641684113",
  appId: "1:1017641684113:web:c6a6a6dc074c1247d08330",
  measurementId: "G-7KYYJQ1VMR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
