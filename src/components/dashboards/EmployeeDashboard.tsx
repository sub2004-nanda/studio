
"use client";

import { UserData } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ListTodo, Percent, TrendingUp, MessageSquare, Bell } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Progress } from "@/components/ui/progress";

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
    { type: "feedback", content: "Great work on the Q3 report!", author: "Jane Doe", icon: MessageSquare },
    { type: "notification", content: "New task 'Prepare Q4 presentation' assigned.", author: "Admin", icon: Bell },
]

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
                <StatCard title="Tasks Completed" value="30" icon={CheckCircle} change="+5 from last week" />
                <StatCard title="Pending Tasks" value="8" icon={ListTodo} />
                <StatCard title="Overall Performance" value="91%" icon={TrendingUp} change="+2% from last month" />
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
                                <Bar dataKey="completed" fill="hsl(var(--primary))" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>KPI Progress</CardTitle>
                        <CardDescription>Your progress towards key performance indicators.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {kpiData.map(kpi => (
                            <div key={kpi.name}>
                                <div className="flex justify-between items-center mb-1">
                                    <p className="text-sm font-medium">{kpi.name}</p>
                                    <p className={`text-sm font-bold ${kpi.value >= kpi.target ? 'text-green-600' : 'text-yellow-600'}`}>{kpi.value}%</p>
                                </div>
                                <Progress value={kpi.value} />
                            </div>
                        ))}
                         <Button variant="outline" className="w-full mt-4">View All KPIs</Button>
                    </CardContent>
                </Card>
                
                <Card className="lg:col-span-5">
                    <CardHeader>
                        <CardTitle>Recent Activity & Feedback</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <li key={index} className="flex items-start gap-4">
                                     <div className="p-2 bg-muted rounded-full">
                                        <activity.icon className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{activity.content}</p>
                                        <p className="text-sm text-muted-foreground">from {activity.author}</p>
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
