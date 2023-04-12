// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDu4BEvC_XWvBmYK3-MkyDpZQ1z5f9QDo8",
  authDomain: "hydromi-auth.firebaseapp.com",
  projectId: "hydromi-auth",
  storageBucket: "hydromi-auth.appspot.com",
  messagingSenderId: "24749753605",
  appId: "1:24749753605:web:0ccec926737d73b6dde36c"
};

// Initialize Firebase
let app
let auth

if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
    });

} else {
    app = getApps()[0];
    auth = getAuth(app);
}

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app,auth, db,collection, addDoc }