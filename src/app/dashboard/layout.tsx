
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import DashboardHeader from "@/components/layout/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, status } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // Only redirect if authentication is resolved and there is no user.
    if (status === 'unauthenticated') {
      router.push("/login");
    }
  }, [status, router]);

  // Show a loader while authentication is in progress.
  if (status === 'loading' || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  // Render the dashboard once the user is authenticated and their data is resolved.
  return (
      <div className="flex min-h-screen w-full flex-col">
        <DashboardHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
            {children}
        </main>
      </div>
  );
}
