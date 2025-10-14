
"use client";

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import type { UserData } from './use-auth';
import { useAuth } from './use-auth';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, SecurityRuleContext } from '@/firebase/errors';

export function useUsers() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const db = useFirestore();
  const { status, user } = useAuth(); // Changed from userData to user

  useEffect(() => {
    // If auth state is still loading, we are also loading.
    if (status === 'loading') {
      setLoading(true);
      return;
    }

    // If auth is resolved but there's no logged-in user or db connection, stop.
    // Any authenticated user can now fetch the user list.
    if (status !== 'resolved' || !user || !db) {
      setUsers([]);
      setLoading(false);
      return;
    }

    // Now we are sure we have a logged-in user.
    const usersCollectionRef = collection(db, 'users');
    const q = query(usersCollectionRef, orderBy('name'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersData: UserData[] = [];
      querySnapshot.forEach((doc) => {
        usersData.push(doc.data() as UserData);
      });
      setUsers(usersData);
      setLoading(false);
    }, (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: usersCollectionRef.path,
        operation: 'list',
      } satisfies SecurityRuleContext);
      errorEmitter.emit('permission-error', permissionError);

      console.error("Permission denied while fetching users. You may need to adjust your Firestore security rules to allow reads on the 'users' collection.");

      setUsers([]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [db, status, user]);

  return { users, loading };
}
