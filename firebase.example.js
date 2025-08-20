// firebase.example.js
// How to use this file:
// 1) Copy this file to firebase.js (same folder).
// 2) Replace the dummy firebaseConfig values below with your real project values.
//    You can find them in Firebase Console:
//    Firebase Console > Your Project > Project settings > General tab >
//    "Your apps" section > SDK setup and configuration > Firebase Config.
// 3) Do NOT commit firebase.js. We added it to .gitignore to keep your local config out of git.

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// It’s OK to include these keys in client apps; they are not secrets.
// Replace each value with your own Firebase project's values.
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID" // If not available, you can remove this line.
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Add AsyncStorage-backed persistence for React Native
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

let authInstance;
try {
    // First run: set persistence with AsyncStorage
    authInstance = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
    });
} catch (e) {
    // If Auth was already initialized, reuse it
    authInstance = getAuth(app);
}

export const auth = authInstance;
export const db = getFirestore(app);