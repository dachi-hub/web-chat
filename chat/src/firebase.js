import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDfU149G_6WC3JMqDcjimOA3UHL5N5ZA94",
    authDomain: "web-chat-be9c5.firebaseapp.com",
    projectId: "web-chat-be9c5",
    storageBucket: "web-chat-be9c5.appspot.com",
    messagingSenderId: "250300593888",
    appId: "1:250300593888:web:8c9c85ac623881fa4a8285",
    measurementId: "G-Y5CVSR6SNG"
};

export const app = initializeApp(firebaseConfig);
export const auth= getAuth();
export const storage=getStorage();
export const db= getFirestore();
