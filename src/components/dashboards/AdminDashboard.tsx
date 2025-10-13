
"use client";

import { UserData } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FolderKanban, Activity, Building, UserCheck, Target, Bot, Bell, Eye, Loader2, BarChart } from "lucide-react";
import { useUsers } from "@/hooks/use-users";
import { useDepartments } from "@/hooks/use-departments";
import { useAuth } from "@/hooks/use-auth";
import { FeatureCard } from "./FeatureCard";

const StatCard = ({ title, value, icon: Icon }: { title: string, value: string | number, icon: React.ElementType }) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    );
};

function AdminDashboardContent({ user, userData }: { user: any; userData: UserData | null; }) {
    const { users, loading: usersLoading } = useUsers();
    const { departments, loading: departmentsLoading } = useDepartments();
    const loading = usersLoading || departmentsLoading;

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {userData?.name}. Here's your admin overview.</p>
            </div>
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <StatCard title="Total Employees" value={loading ? '...' : users.length} icon={UserCheck} />
                <StatCard title="Departments" value={loading ? '...' : departments.length} icon={Building} />
                 <StatCard title="Pending Approvals" value={loading ? '...' : users.filter(u => u.status === 'pending_approval').length} icon={UserCheck} />
                 <StatCard title="Active Projects" value={'...'} icon={FolderKanban} />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <FeatureCard
                    title="Users"
                    description="View, add, and manage all users."
                    icon={Users}
                    href="/dashboard/users"
                />
                 <FeatureCard
                    title="Departments"
                    description="Define departments and assign managers."
                    icon={Building}
                    href="/dashboard/departments"
                />
                <FeatureCard
                    title="Projects"
                    description="Assign new projects to managers."
                    icon={FolderKanban}
                    href="/dashboard/projects"
                />
                 <FeatureCard
                    title="Goals"
                    description="Set and assign goals for the organization."
                    icon={Target}
                    href="/dashboard/goals"
                />
                <FeatureCard
                    title="Performance"
                    description="Monitor real-time productivity."
                    icon={Activity}
                    href="/dashboard/performance"
                />
                <FeatureCard
                    title="KPIs"
                    description="Define and standardize KPIs for roles."
                    icon={Target}
                    href="/dashboard/kpi"
                />
                 <FeatureCard
                    title="Reports"
                    description="Generate and schedule automated reports."
                    icon={BarChart}
                    href="/dashboard/reports"
                />
                 <FeatureCard
                    title="Alerts"
                    description="Broadcast announcements and alerts."
                    icon={Bell}
                    href="/dashboard/communication"
                />
                 <FeatureCard
                    title="Privacy"
                    description="Detect anomalies and ensure data accuracy."
                    icon={Eye}
                    href="/dashboard/privacy"
                />
            </div>
        </>
    );
}

export default function AdminDashboard({ user, userData }: { user: any; userData: UserData | null; }) {
    const { status } = useAuth();

    if (status !== 'resolved') {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }
    
    return <AdminDashboardContent user={user} userData={userData} />;
}
