// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyCLYRXKvwTB9xyAMClg04luQsL8vyaj6VI",
    authDomain: "tfichas-a6672.firebaseapp.com",
    projectId: "tfichas-a6672",
    storageBucket: "tfichas-a6672.appspot.com",
    messagingSenderId: "150529796747",
    appId: "1:150529796747:web:c4db0ee94d1147c485428e"

  };

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)