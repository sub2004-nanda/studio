
"use client";

import { UserData } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useAuth as useFirebaseAuth } from "@/firebase/provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, LogOut, Users, FolderKanban, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";


const AdminFeatureCard = ({ title, description, icon: Icon, href }: { title: string, description: string, icon: React.ElementType, href: string }) => {
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{title}</CardTitle>
                <Icon className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{description}</p>
                <Link href={href} passHref>
                    <Button variant="outline" className="w-full">
                        Go to {title} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}

export default function AdminDashboard({ user, userData }: { user: any; userData: UserData | null; }) {
    const auth = useFirebaseAuth();

    const handleLogout = () => {
        if (auth) {
            auth.signOut();
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-muted/40">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                 <div className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-primary"/>
                    <h1 className="font-headline text-xl font-semibold">Admin Dashboard</h1>
                 </div>
                 <div className="ml-auto flex items-center gap-4">
                    <div className="text-right">
                        <p className="font-semibold">{userData?.name}</p>
                        <p className="text-xs text-muted-foreground">{userData?.email}</p>
                    </div>
                    <Button variant="outline" size="icon" onClick={handleLogout}>
                        <LogOut className="h-4 w-4" />
                        <span className="sr-only">Logout</span>
                    </Button>
                 </div>
            </header>
            <main className="flex-1 p-4 sm:px-6 sm:py-0">
                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <AdminFeatureCard
                        title="User Management"
                        description="View, add, and manage all users."
                        icon={Users}
                        href="/dashboard/users"
                    />
                     <AdminFeatureCard
                        title="Assign Projects"
                        description="Assign new projects to managers."
                        icon={FolderKanban}
                        href="/dashboard/projects"
                    />
                    <AdminFeatureCard
                        title="Performance Overview"
                        description="Monitor real-time productivity."
                        icon={Activity}
                        href="/dashboard/performance"
                    />
                 </div>
            </main>
        </div>
    );
}
