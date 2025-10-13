
"use client";

import { useEffect } from "react";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

export default function FirebaseErrorListener() {
  useEffect(() => {
    const handlePermissionError = (error: FirestorePermissionError) => {
      // In a development environment, we throw the error to leverage
      // Next.js's error overlay for maximum visibility.
      if (process.env.NODE_ENV === "development") {
        throw error;
      }
      // In production, you might want to log this to a service
      // or show a user-friendly toast notification.
      console.error("Firestore Permission Error:", error.message);
    };

    errorEmitter.on("permission-error", handlePermissionError);

    return () => {
      errorEmitter.off("permission-error", handlePermissionError);
    };
  }, []);

  return null;
}
