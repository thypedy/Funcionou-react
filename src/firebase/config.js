// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMjUZvfjmX4xzYr2dpwovnWBjUzQWAqM8",
  authDomain: "miniblog-38e3e.firebaseapp.com",
  projectId: "miniblog-38e3e",
  storageBucket: "miniblog-38e3e.appspot.com",
  messagingSenderId: "905923130386",
  appId: "1:905923130386:web:702edda61dd0739c6fd4cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };