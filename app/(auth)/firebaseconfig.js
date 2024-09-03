import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth'; // Correct import for modular approach
import { getFirestore } from 'firebase/firestore'; // Import Firestore
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from '@env';

// Firebase configuration object
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "ingesof-i.firebaseapp.com",
  projectId: "ingsoft-i",
  storageBucket: "ingesof-i.appspot.com",
  messagingSenderId: "239079751775",
  appId: "1:239079751775:android:e7b8b472a4a88f2aa3dbea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with React Native persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const firestore = getFirestore(app);

export { auth, firestore, app };
