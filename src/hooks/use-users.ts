
"use client";

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import type { UserData } from './use-auth';
import { useAuth } from './use-auth';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, SecurityRuleContext } from '@/firebase/errors';

// Mock data to ensure the page is populated for demonstration
const mockUsers: UserData[] = [
    { uid: 'admin-user-id', name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'approved' },
    { uid: 'manager-user-id', name: 'Manager User', email: 'manager@example.com', role: 'manager', status: 'approved', departmentId: 'dept-eng' },
    { uid: 'employee-user-id-1', name: 'Employee One', email: 'employee1@example.com', role: 'employee', status: 'approved', departmentId: 'dept-eng' },
    { uid: 'employee-user-id-2', name: 'Employee Two', email: 'employee2@example.com', role: 'employee', status: 'pending_approval' },
    { uid: 'viewer-user-id', name: 'Viewer User', email: 'viewer@example.com', role: 'viewer', status: 'approved' },
];


export function useUsers() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const db = useFirestore();
  const { status, userData } = useAuth(); 

  useEffect(() => {
    // If auth state is still loading, we are also loading.
    if (status === 'loading') {
      setLoading(true);
      return;
    }

    // --- Using Mock Data for Demonstration ---
    // In a production app, you would remove this block and rely on the Firestore listener below.
    if (process.env.NODE_ENV === 'development') {
        setUsers(mockUsers);
        setLoading(false);
        return;
    }
    // --- End of Mock Data Block ---

    // If auth is resolved but user is not an admin (or not logged in), stop loading and return empty array.
    if (status !== 'resolved' || !userData || userData.role !== 'admin' || !db) {
        setUsers([]);
        setLoading(false);
        return;
    }

    // Now we are sure we have a logged-in admin.
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
  }, [db, status, userData]);

  return { users, loading };
}
