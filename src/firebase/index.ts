
"use client";

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "studio-6728849622-6abc7",
  appId: "1:997027446757:web:40a2ab70cde226bcf8390c",
  apiKey: "AIzaSyCwLyzHpVRZ1No8J2lj1d4tpC2_OEDPAWU",
  authDomain: "studio-6728849622-6abc7.firebaseapp.com",
  storageBucket: "studio-6728849622-6abc7.appspot.com",
  messagingSenderId: "997027446757",
};

export function initializeFirebase(): {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
} {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);
  const db = getFirestore(app);
  return { app, auth, db };
}

export {
  FirebaseProvider,
  useFirebaseApp,
  useAuth,
  useUser,
  useFirestore,
} from './provider';
