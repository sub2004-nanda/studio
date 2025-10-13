
"use client";

import { UserData } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, CheckSquare, BarChart as BarChartIcon, Bell, ArrowRight, TrendingUp, Users2, Activity, Lightbulb, Bot, Trophy } from "lucide-react";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import ProductivityHeatmap from "./ProductivityHeatmap";

const teamData = [
  { name: 'You', performance: 91 },
  { name: 'Team Avg.', performance: 85 },
  { name: 'Company Avg.', performance: 82 },
];

const taskData = [
  { date: 'Mon', completed: 12 },
  { date: 'Tue', completed: 15 },
  { date: 'Wed', completed: 10 },
  { date: 'Thu', completed: 18 },
  { date: 'Fri', completed: 20 },
];

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


export default function ManagerDashboard({ user, userData }: { user: any; userData: UserData | null; }) {
    
    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Manager Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {userData?.name}. Here's your department overview.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <StatCard title="Team Productivity" value="88%" icon={TrendingUp} change="+3% this week" />
                <StatCard title="Team Members" value="12" icon={Users2} />
                <StatCard title="Pending Reviews" value="4" icon={Activity} />
                <StatCard title="Completed Tasks" value="45" icon={CheckSquare} change="+10 from last week" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
                 <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Team Performance vs. Averages</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={teamData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="performance" fill="hsl(var(--primary))" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>AI Performance Insights</CardTitle>
                        <CardDescription>Suggestions to boost team productivity.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-3">
                            <Lightbulb className="h-5 w-5 text-yellow-400 mt-1" />
                            <div>
                                <p className="font-medium text-sm">Potential Burnout Risk</p>
                                <p className="text-muted-foreground text-sm">"Employee X" has a high task load. Consider reassigning non-critical tasks.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-3">
                            <Lightbulb className="h-5 w-5 text-yellow-400 mt-1" />
                            <div>
                                <p className="font-medium text-sm">Sentiment Analysis</p>
                                <p className="text-muted-foreground text-sm">Sentiment analysis suggests "Employee Y" may be feeling overwhelmed. A quick check-in could be beneficial.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-5">
                    <CardHeader>
                        <CardTitle>Real-Time Productivity Heatmap</CardTitle>
                        <CardDescription>Live overview of team activity and performance levels.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <ProductivityHeatmap />
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
                    title="AI Reports & Analytics"
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
                    title="Leaderboards & Badges"
                    description="Boost motivation with gamified goals and KPIs."
                    icon={Trophy}
                    href="/dashboard/goals"
                />
            </div>
        </>
    );
}
