
"use client";

import { useState, useEffect } from 'react';
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

type AuthState = {
  status: 'loading' | 'unauthenticated' | 'resolved';
  user: ReturnType<typeof useUser>;
  userData: UserData | null;
}

export function useAuth() {
  const auth = useFirebaseAuth();
  const user = useUser();
  const db = useFirestore();
  const [authState, setAuthState] = useState<AuthState>({
    status: 'loading',
    user: null,
    userData: null
  });

  useEffect(() => {
    if (!auth) {
      // Firebase auth is not initialized yet.
      setAuthState(prevState => ({ ...prevState, status: 'loading' }));
      return;
    }
  
    if (!user && auth.app) {
      // Auth is initialized, but no user is logged in.
      setAuthState({ status: 'unauthenticated', user: null, userData: null });
      return;
    }
    
    if (!user || !db) {
        // Still waiting for user or firestore instance
        return;
    }


    // At this point, we have a user from Firebase Auth, but we need their data from Firestore.
    // The state is still 'loading' until we get the Firestore document.
    setAuthState(prevState => ({ ...prevState, status: 'loading', user }));

    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const userDataFromDb = docSnap.data() as UserData;
        setAuthState({
          status: 'resolved',
          user: user,
          userData: userDataFromDb,
        });
      } else {
        // User is in Auth but not in Firestore, treat as unauthenticated for our app's purposes.
        // This can happen if user is created in Auth but firestore doc creation fails
        setAuthState({ status: 'unauthenticated', user: user, userData: null });
      }
    }, (error) => {
      console.error("Error fetching user data:", error);
      setAuthState({ status: 'unauthenticated', user: user, userData: null });
    });

    return () => unsubscribe();
  }, [user, auth, db]);

  return authState;
}
