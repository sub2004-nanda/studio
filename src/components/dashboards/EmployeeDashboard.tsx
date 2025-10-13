
"use client";

import { UserData } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ListTodo, Trophy, TrendingUp, MessageSquare, Bell, File, BarChart } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

const StatCard = ({ title, value, icon: Icon, change }: { title: string, value: string | number, icon: React.ElementType, change?: string }) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {change && <p className="text-xs text-muted-foreground">{change}</p>}
            </CardContent>
        </Card>
    );
};

export default function EmployeeDashboard({ user, userData }: { user: any; userData: UserData | null }) {
    
    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">My Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {userData?.name}. Here's your productivity overview.</p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <StatCard title="Tasks Completed (Month)" value="30" icon={CheckCircle} change="+5 from last week" />
                <StatCard title="Pending Tasks" value="8" icon={ListTodo} />
                <StatCard title="Overall Performance Score" value="91%" icon={TrendingUp} change="+2% from last month" />
                <StatCard title="Achievements Unlocked" value="5" icon={Trophy} change="New 'Deadline Hero' badge!" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <FeatureCard 
                    title="My Tasks"
                    description="View, update, and submit your assigned tasks."
                    icon={ListTodo}
                    href="/dashboard/tasks"
                />
                 <FeatureCard 
                    title="My Goals"
                    description="Track your personal goals and KPI progress."
                    icon={Trophy}
                    href="/dashboard/goals"
                />
                 <FeatureCard 
                    title="My Performance"
                    description="Visualize your performance trends over time."
                    icon={BarChart}
                    href="/dashboard/performance"
                />
                 <FeatureCard 
                    title="My Documents"
                    description="Manage your personal and work-related documents."
                    icon={File}
                    href="/dashboard/documents"
                />
                 <FeatureCard 
                    title="Notifications"
                    description="See recent updates, feedback, and announcements."
                    icon={Bell}
                    href="/dashboard/communication"
                />
            </div>
        </>
    );
}
