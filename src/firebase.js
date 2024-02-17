// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4w5RxlxwgN6EvlT7n71YDxe7hKyo9Zfc",
  authDomain: "poultry-palace-authentication.firebaseapp.com",
  projectId: "poultry-palace-authentication",
  storageBucket: "poultry-palace-authentication.appspot.com",
  messagingSenderId: "88103451067",
  appId: "1:88103451067:web:0150dd879ae4d677dfac9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);