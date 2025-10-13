
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
  departmentId?: string;
}

export function useAuth() {
  const auth = useFirebaseAuth();
  const user = useUser();
  const db = useFirestore();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth?.app) {
        // Firebase not initialized yet
        return;
    }
    
    if (user === null) {
        // User is not logged in
        setUserData(null);
        setLoading(false);
        return;
    }
    
    // User is logged in, but we haven't fetched their data yet.
    setLoading(true);

    if (db) {
      const userDocRef = doc(db, 'users', user.uid);
      
      const unsubscribeFirestore = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserData);
        } else {
          // User exists in Auth, but not in Firestore DB. Treat as logged out/no permissions.
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
