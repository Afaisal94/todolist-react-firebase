import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhO7sbKqfKN9jd9xphHEn8VKQIAlIV_Lg",
  authDomain: "todolist-bfc62.firebaseapp.com",
  projectId: "todolist-bfc62",
  storageBucket: "todolist-bfc62.appspot.com",
  messagingSenderId: "568944783136",
  appId: "1:568944783136:web:299db71353a1a9126cf145",
  measurementId: "G-3KDWPDNPEJ",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
