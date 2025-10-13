
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { FirebaseApp } from "firebase/app";
import { Auth, User, onAuthStateChanged } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { initializeFirebase } from "./index";

// Define the context shape
interface FirebaseContextType {
  app: FirebaseApp | null;
  auth: Auth | null;
  db: Firestore | null;
  user: User | null;
}

// Create the context
const FirebaseContext = createContext<FirebaseContextType>({
  app: null,
  auth: null,
  db: null,
  user: null,
});

// Create the provider component
export function FirebaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [firebase, setFirebase] = useState<Omit<
    FirebaseContextType,
    "user"
  > | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { app, auth, db } = initializeFirebase();
    setFirebase({ app, auth, db });

    // Set up auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ ...firebase, user } as FirebaseContextType}>
      {children}
    </FirebaseContext.Provider>
  );
}

// Create custom hooks for easy access
export const useFirebaseApp = () => useContext(FirebaseContext)?.app;
export const useAuth = () => useContext(FirebaseContext)?.auth;
export const useFirestore = () => useContext(FirebaseContext)?.db;
export const useUser = () => useContext(FirebaseContext)?.user;
