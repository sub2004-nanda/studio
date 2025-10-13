
"use client";

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuth as useFirebaseAuth, useUser, useFirestore } from '@/firebase/provider';

export interface UserData {
  uid: string;
  name: string;
  email: string;
  role: 'unassigned' | 'admin' | 'manager' | 'employee' | 'viewer';
  status: 'pending_approval' | 'approved' | 'rejected';
}

export function useAuth() {
  const auth = useFirebaseAuth();
  const user = useUser();
  const db = useFirestore();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === null && auth?.app) {
        setLoading(false);
        return;
    }
    
    if (user) {
      if (!db) {
        console.error("Firestore is not initialized");
        setLoading(false);
        return;
      }
      const userDocRef = doc(db, 'users', user.uid);
      
      const unsubscribeFirestore = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserData);
        } else {
          setUserData(null);
        }
        setLoading(false);
      }, (error) => {
        console.error("Error fetching user data:", error);
        setUserData(null);
        setLoading(false);
      });

      return () => unsubscribeFirestore();
    }
  }, [user, auth, db]);

  return { user, userData, loading };
}
