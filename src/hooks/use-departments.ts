
"use client";

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, DocumentData } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, SecurityRuleContext } from '@/firebase/errors';

export interface Department {
  id: string;
  name: string;
  managerUid?: string;
}

export function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const db = useFirestore();

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

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
  }, [db]);

  return { departments, loading };
}
