
"use client";

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import type { UserData } from './use-auth';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, SecurityRuleContext } from '@/firebase/errors';

export function useUsers() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const db = useFirestore();

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const usersCollectionRef = collection(db, 'users');
    const q = query(usersCollectionRef, orderBy('name'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersData: UserData[] = [];
      querySnapshot.forEach((doc) => {
        usersData.push(doc.data() as UserData);
      });
      setUsers(usersData);
      setLoading(false);
    }, 
    (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: usersCollectionRef.path,
        operation: 'list',
      } satisfies SecurityRuleContext);
      errorEmitter.emit('permission-error', permissionError);

      setUsers([]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [db]);

  return { users, loading };
}
