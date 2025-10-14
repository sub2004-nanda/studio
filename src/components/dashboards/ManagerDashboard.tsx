
"use client";

import { UserData } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Target, CheckSquare, BarChart as BarChartIcon, Bell, TrendingUp, Users2, Activity, Bot, Loader2, Trophy } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ProductivityHeatmap from "./ProductivityHeatmap";
import { FeatureCard } from "./FeatureCard";
import { useManagerData, useTeamTasks } from "@/hooks/use-manager-data";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const StatCard = ({ title, value, icon: Icon, change, children }: { title: string, value: string | number, icon: React.ElementType, change?: string, children?: React.ReactNode }) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {change && <p className="text-xs text-muted-foreground">{change}</p>}
                {children}
            </CardContent>
        </Card>
    );
};


export default function ManagerDashboard({ user, userData }: { user: any; userData: UserData | null; }) {
    const { teamMembers, teamProductivity, loading: managerDataLoading } = useManagerData(userData);
    const { tasks, loading: tasksLoading } = useTeamTasks(teamMembers);

    const loading = managerDataLoading || tasksLoading;

    const pendingReviewsCount = tasks.filter(t => t.status === 'Submitted').length;
    const completedTasksCount = tasks.filter(t => t.status === 'Completed').length;
    const tasksDueThisWeek = tasks.filter(t => {
        const dueDate = new Date(t.due);
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
        return dueDate >= today && dueDate <= nextWeek;
    }).length;

    const aiInsights = [
        {
            id: 1,
            title: "Potential Burnout Risk",
            description: "Ankit has a high task load with 3 high-priority tasks due this week. Consider reassigning non-critical items.",
            show: tasks.filter(t => t.assignee === 'Ankit' && t.priority === 'High').length > 2,
        },
        {
            id: 2,
            title: "Kudos Opportunity",
            description: "Deepika has the highest task completion rate this month. A public recognition could boost morale.",
            show: true
        }
    ];

    const performanceData = [
      { name: 'Your Team', performance: teamProductivity },
      { name: 'Company Avg.', performance: 82 },
    ];


    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Manager Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {userData?.name}. Here's your department's overview.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <StatCard title="Team Productivity" value={`${teamProductivity}%`} icon={TrendingUp} change="+3% this week">
                     <Select defaultValue="this-week">
                        <SelectTrigger className="text-xs h-7 mt-2 w-[120px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="this-week">This Week</SelectItem>
                            <SelectItem value="this-month">This Month</SelectItem>
                            <SelectItem value="this-quarter">This Quarter</SelectItem>
                        </SelectContent>
                    </Select>
                </StatCard>
                <StatCard title="Team Members" value={teamMembers.length} icon={Users2} change={`${teamMembers.filter(m => m.status === 'approved').length} active`}>
                    <div className="flex space-x-2 mt-2">
                        <Button variant="outline" size="sm" className="text-xs" asChild><Link href="/dashboard/team">View Details</Link></Button>
                        <Button variant="outline" size="sm" className="text-xs">Message All</Button>
                    </div>
                </StatCard>
                <StatCard title="Pending Reviews" value={pendingReviewsCount} icon={Activity} change={`${tasksDueThisWeek} tasks due this week`}>
                     <div className="flex space-x-2 mt-2">
                        <Button variant="outline" size="sm" className="text-xs" asChild><Link href="/dashboard/tasks">Review Tasks</Link></Button>
                    </div>
                </StatCard>
                <StatCard title="Completed Tasks" value={completedTasksCount} icon={CheckSquare} change="+10 from last week" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
                 <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Team Performance vs. Averages</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={performanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="performance" fill="hsl(var(--primary))" name="Performance Score" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>AI-Powered Insights</CardTitle>
                        <CardDescription>Real-time, data-driven suggestions to boost team productivity.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {aiInsights.filter(insight => insight.show).map(insight => (
                            <div key={insight.id} className="flex items-start gap-3">
                                <Bot className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-sm">{insight.title}</p>
                                    <p className="text-muted-foreground text-sm">{insight.description}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-5">
                    <CardHeader>
                        <CardTitle>Real-Time Productivity Heatmap</CardTitle>
                        <CardDescription>Live overview of team activity and performance levels.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <ProductivityHeatmap teamMembers={teamMembers} tasks={tasks} />
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <FeatureCard
                    title="Team"
                    description="View and manage your department's employees."
                    icon={Users}
                    href="/dashboard/team"
                />
                 <FeatureCard
                    title="Smart Allocation"
                    description="AI-powered task assignment based on skill & workload."
                    icon={Bot}
                    href="/dashboard/tasks"
                />
                <FeatureCard
                    title="Task Review"
                    description="Review and approve tasks submitted by your team."
                    icon={CheckSquare}
                    href="/dashboard/tasks"
                />
                <FeatureCard
                    title="AI Reports"
                    description="Generate AI-summarized performance reports."
                    icon={BarChartIcon}
                    href="/dashboard/reports"
                />
                 <FeatureCard
                    title="Communication"
                    description="Send announcements and monitor team sentiment."
                    icon={Bell}
                    href="/dashboard/communication"
                />
                 <FeatureCard
                    title="Leaderboards"
                    description="Boost motivation with gamified goals and KPIs."
                    icon={Trophy}
                    href="/dashboard/goals"
                />
            </div>
        </>
    );
}
