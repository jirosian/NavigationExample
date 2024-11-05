// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Firestoreのインポート
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorageのインポート


const firebaseConfig = {
  apiKey: "AIzaSyD6YWlrqS846R0tnFhAL2lRfSWJuVJ5lYk",
  authDomain: "iat359-1ef08.firebaseapp.com",
  projectId: "iat359-1ef08",
  storageBucket: "iat359-1ef08.appspot.com",
  messagingSenderId: "744065577344",
  appId: "1:744065577344:web:a027b4b551c74b7f919165",
  measurementId: "G-19QGVP04PL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app); // Firestoreの初期化
const storage = getStorage(app);


export { auth, firestore, storage };
