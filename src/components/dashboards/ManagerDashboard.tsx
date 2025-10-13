
"use client";

import { UserData } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, CheckSquare, BarChart, Bell, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useUsers } from "@/hooks/use-users";

const FeatureCard = ({ title, description, icon: Icon, href }: { title: string, description: string, icon: React.ElementType, href: string }) => {
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

export default function ManagerDashboard({ user, userData }: { user: any; userData: UserData | null; }) {
    
    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Manager Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {userData?.name}. Here's your department overview.</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <FeatureCard
                    title="Team"
                    description="View and manage your department's employees."
                    icon={Users}
                    href="/dashboard/team"
                />
                <FeatureCard
                    title="Goals & KPIs"
                    description="Set and track department and individual goals."
                    icon={Target}
                    href="/dashboard/goals"
                />
                <FeatureCard
                    title="Task Review"
                    description="Review and approve tasks submitted by your team."
                    icon={CheckSquare}
                    href="/dashboard/tasks"
                />
                <FeatureCard
                    title="Reports"
                    description="Generate and view performance reports."
                    icon={BarChart}
                    href="/dashboard/reports"
                />
                 <FeatureCard
                    title="Communication"
                    description="Send announcements and messages to your team."
                    icon={Bell}
                    href="/dashboard/communication"
                />
            </div>
        </>
    );
}
