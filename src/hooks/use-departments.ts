
"use client";

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, DocumentData } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { useAuth } from './use-auth';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, SecurityRuleContext } from '@/firebase/errors';

export interface Department {
  id: string;
  name: string;
  managerUid?: string;
  departmentId?: string;
}

export function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const db = useFirestore();
  const { status, userData } = useAuth();

  useEffect(() => {
    // If auth state is still loading, we are also loading.
    if (status === 'loading') {
        setLoading(true);
        return;
    }

    // If auth is resolved but user is not an admin (or not logged in), stop loading and return empty array.
    if (status !== 'resolved' || !userData || userData.role !== 'admin' || !db) {
        setDepartments([]);
        setLoading(false);
        return;
    }

    // Now we are sure we have a logged-in admin.
    const departmentsCollectionRef = collection(db, 'departments');
    const q = query(departmentsCollectionRef, orderBy('name'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const departmentsData: Department[] = [];
      querySnapshot.forEach((doc) => {
        departmentsData.push({ id: doc.id, ...doc.data() } as Department);
      });
      setDepartments(departmentsData);
      setLoading(false);
    }, 
    (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: departmentsCollectionRef.path,
        operation: 'list',
      } satisfies SecurityRuleContext);
      errorEmitter.emit('permission-error', permissionError);

      setDepartments([]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [db, status, userData]);

  return { departments, loading };
}
