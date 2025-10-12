
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth, UserData } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Logo from "@/components/icons/logo";
import { Badge } from "@/components/ui/badge";

function PendingApproval({ user }: { user: any; }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/50 p-4 text-center">
       <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mx-auto w-fit rounded-full bg-primary/10 p-4 mb-4">
            <Logo className="h-12 w-12 text-primary"/>
          </div>
          <CardTitle className="font-headline text-2xl">Account Verification Pending</CardTitle>
          <CardDescription>
            Welcome, {user.displayName || 'User'}!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            Your account is currently under admin verification. You will be notified once your account is approved.
          </p>
          <Button onClick={() => auth.signOut()}>Logout</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function MainDashboard({ user, userData }: { user: any; userData: UserData | null }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Dashboard</CardTitle>
                    <CardDescription>Welcome back, {user.displayName || userData?.name}!</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-6 text-center">
                      <p className="text-lg text-muted-foreground">You are logged in and your dashboard is ready.</p>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-2 mb-8">
                        <p className="text-md">Your Role:</p>
                        <Badge variant="secondary" className="text-md capitalize">
                            {userData?.role || 'Not Assigned'}
                        </Badge>
                    </div>

                    <Button onClick={() => auth.signOut()}>Logout</Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default function DashboardPage() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null; // Redirection is handled by the effect
  }
  
  // This logic is currently not hit because new users are auto-approved.
  // We can re-enable this later for admin-approval flows.
  if (userData?.status === 'pending_approval') {
      return <PendingApproval user={user} />;
  }

  return <MainDashboard user={user} userData={userData} />;
}
