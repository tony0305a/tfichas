// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig1 = {
    apiKey: "AIzaSyCLYRXKvwTB9xyAMClg04luQsL8vyaj6VI",
    authDomain: "tfichas-a6672.firebaseapp.com",
    projectId: "tfichas-a6672",
    storageBucket: "tfichas-a6672.appspot.com",
    messagingSenderId: "150529796747",
    appId: "1:150529796747:web:c4db0ee94d1147c485428e"

  };
  const firebaseConfig = {

    apiKey: "AIzaSyA4-0eJeXOjf8jUcjbT0oIEjBylfdHrtJA",
  
    authDomain: "westeros-war.firebaseapp.com",
  
    projectId: "westeros-war",
  
    storageBucket: "westeros-war.appspot.com",
  
    messagingSenderId: "943630611565",
  
    appId: "1:943630611565:web:112cb4ebf1f01dcefabb64",
  
    measurementId: "G-13HPCW5B3V"
  
  };
  

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)