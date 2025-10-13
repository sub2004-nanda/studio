
"use client";

import { UserData } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FolderKanban, Activity, ArrowRight } from "lucide-react";
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

    return (
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
    );
}
