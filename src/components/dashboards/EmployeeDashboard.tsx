
"use client";

import { UserData } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ListTodo, Percent, TrendingUp, MessageSquare, Bell, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";

const taskData = [
  { name: 'Mon', completed: 4 },
  { name: 'Tue', completed: 6 },
  { name: 'Wed', completed: 5 },
  { name: 'Thu', completed: 7 },
  { name: 'Fri', completed: 8 },
];

const kpiData = [
    { name: "Customer Satisfaction", value: 92, target: 90 },
    { name: "Response Time", value: 85, target: 95 },
    { name: "Code Quality", value: 95, target: 90 },
]

const recentActivity = [
    { type: "feedback", content: "Great work on the Q3 report! The insights were excellent.", author: "Jane Doe (Manager)", icon: MessageSquare },
    { type: "notification", content: "New task 'Prepare Q4 presentation' has been assigned to you.", author: "System", icon: Bell },
    { type: "feedback", content: "Submission for 'Initial project mockups' was approved.", author: "Jane Doe (Manager)", icon: CheckCircle },
]

const ongoingTasks = [
    { id: 1, title: "Prepare Q4 presentation", priority: "High", due: "2024-10-25" },
    { id: 2, title: "Update client contact list", priority: "Medium", due: "2024-10-22" },
    { id: 3, title: "Fix login page bug", priority: "High", due: "2024-10-20" },
];


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
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                <StatCard title="Tasks Completed (This Month)" value="30" icon={CheckCircle} change="+5 from last week" />
                <StatCard title="Pending Tasks" value="8" icon={ListTodo} />
                <StatCard title="Overall Performance Score" value="91%" icon={TrendingUp} change="+2% from last month" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Weekly Task Completion</CardTitle>
                        <CardDescription>Your task completion rate for the current week.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={taskData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="completed" fill="hsl(var(--primary))" name="Tasks Completed" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>My KPI Progress</CardTitle>
                        <CardDescription>Your progress towards key performance indicators.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {kpiData.map(kpi => (
                            <div key={kpi.name}>
                                <div className="flex justify-between items-center mb-1">
                                    <p className="text-sm font-medium">{kpi.name}</p>
                                    <p className={`text-sm font-bold ${kpi.value >= kpi.target ? 'text-green-600' : 'text-yellow-600'}`}>{kpi.value}% / {kpi.target}%</p>
                                </div>
                                <Progress value={kpi.value} />
                            </div>
                        ))}
                         <Button variant="outline" className="w-full mt-4" asChild>
                            <Link href="/dashboard/goals">View All KPIs & Goals <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardContent>
                </Card>
                
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>My Ongoing Tasks</CardTitle>
                        <CardDescription>A quick look at your high-priority and upcoming tasks.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Task</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead>Due Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {ongoingTasks.map(task => (
                                <TableRow key={task.id}>
                                    <TableCell className="font-medium">{task.title}</TableCell>
                                    <TableCell>
                                        <Badge variant={task.priority === 'High' ? 'destructive' : 'secondary'}>{task.priority}</Badge>
                                    </TableCell>
                                    <TableCell>{task.due}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                         <Button variant="default" className="w-full mt-4" asChild>
                            <Link href="/dashboard/tasks">Manage All Tasks <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Recent Activity & Feedback</CardTitle>
                        <CardDescription>Notifications and manager feedback.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <li key={index} className="flex items-start gap-4">
                                     <div className="p-2 bg-muted rounded-full">
                                        <activity.icon className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm leading-snug">{activity.content}</p>
                                        <p className="text-xs text-muted-foreground">from {activity.author}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
