
import { initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCW-VdDNjMykMusd9u_IzPNonZebuGBC5Y",
  authDomain: "recipebox-698f3.firebaseapp.com",
  projectId: "recipebox-698f3",
  storageBucket: "recipebox-698f3.appspot.com",
  messagingSenderId: "139546020369",
  appId: "1:139546020369:web:57b36ca6bda880fb853fb0"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const recipesRef=collection(db,"recipes");
export const reviewsRef = collection(db,"reviews");
export const usersRef=collection(db,"users");

export default app;