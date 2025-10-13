
"use client";

import { UserData } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FolderKanban, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";

const AdminFeatureCard = ({ title, description, icon: Icon, href }: { title: string, description: string, icon: React.ElementType, href: string }) => {
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium">{title}</CardTitle>
                    <div className="p-2 bg-primary/10 rounded-md">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                </div>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Link href={href} passHref>
                    <Button variant="outline" className="w-full">
                        Manage {title} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}

export default function AdminDashboard({ user, userData }: { user: any; userData: UserData | null; }) {

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {userData?.name}. Here's your admin overview.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                    title="Performance"
                    description="Monitor real-time productivity."
                    icon={Activity}
                    href="/dashboard/performance"
                />
            </div>
        </>
    );
}
