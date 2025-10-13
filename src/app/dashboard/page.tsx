
"use client";

import { useAuth as useFirebaseAuth } from "@/firebase/provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/icons/logo";
import { useAuth } from "@/hooks/use-auth";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import ManagerDashboard from "@/components/dashboards/ManagerDashboard";
import EmployeeDashboard from "@/components/dashboards/EmployeeDashboard";

function PendingApproval({ user }: { user: any; }) {
  const auth = useFirebaseAuth();
  const handleLogout = () => {
    if (auth) {
        auth.signOut();
    }
  }

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
          <Button onClick={handleLogout}>Logout</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function DashboardPage() {
  const { user, userData, status } = useAuth();

  if (status !== 'resolved' || !user || !userData) {
    return null; // The layout handles loading and redirection
  }
  
  if (userData.status === 'pending_approval') {
      return <PendingApproval user={user} />;
  }

  const renderDashboard = () => {
    switch (userData.role) {
      case 'admin':
        return <AdminDashboard user={user} userData={userData} />;
      case 'manager':
        return <ManagerDashboard user={user} userData={userData} />;
      case 'employee':
        return <EmployeeDashboard user={user} userData={userData} />;
      default:
        // Fallback for unassigned roles or other cases
        return <EmployeeDashboard user={user} userData={userData} />;
    }
  }

  return renderDashboard();
}
