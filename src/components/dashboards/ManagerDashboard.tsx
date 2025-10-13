
"use client";

import { UserData } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";

export default function ManagerDashboard({ user, userData }: { user: any; userData: UserData | null }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                     <div className="flex justify-center items-center mb-4">
                        <Briefcase className="h-12 w-12 text-primary"/>
                    </div>
                    <CardTitle className="font-headline text-3xl">Manager Dashboard</CardTitle>
                    <CardDescription>Welcome back, {user.displayName || userData?.name}!</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-6 text-center">
                      <p className="text-lg text-muted-foreground">You can oversee your team's performance here.</p>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-2 mb-8">
                        <p className="text-md">Your Role:</p>
                        <Badge variant="secondary" className="text-md capitalize">
                            {userData?.role}
                        </Badge>
                    </div>

                    <Button onClick={() => auth.signOut()}>Logout</Button>
                </CardContent>
            </Card>
        </div>
    );
}
