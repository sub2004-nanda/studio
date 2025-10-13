// This file is deprecated. Please use the hooks and providers from /src/firebase/index.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  "projectId": "studio-6728849622-6abc7",
  "appId": "1:997027446757:web:40a2ab70cde226bcf8390c",
  "apiKey": "AIzaSyCwLyzHpVRZ1No8J2lj1d4tpC2_OEDPAWU",
  "authDomain": "studio-6728849622-6abc7.firebaseapp.com",
  "storageBucket": "studio-6728849622-6abc7.appspot.com",
  "messagingSenderId": "997027446757"
};


let app;
if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
