
"use client";

import PerformanceOverview from "@/components/admin/performance-overview";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { TrendingUp, CheckCircle, ListTodo } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const weeklyCompletionData = [
  { week: 'Week 1', completed: 15, pending: 5 },
  { week: 'Week 2', completed: 18, pending: 3 },
  { week: 'Week 3', completed: 22, pending: 2 },
  { week: 'Week 4', completed: 20, pending: 4 },
];

const kpiTrendData = [
  { month: 'Jan', 'Customer Satisfaction': 88, 'Response Time': 82 },
  { month: 'Feb', 'Customer Satisfaction': 90, 'Response Time': 85 },
  { month: 'Mar', 'Customer Satisfaction': 92, 'Response Time': 84 },
  { month: 'Apr', 'CustomerSatisfaction': 91, 'Response Time': 88 },
];

function EmployeePerformance() {
     return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">My Performance Overview</h1>
                <p className="text-muted-foreground">Visualize your performance trends over time to identify strengths and areas for improvement.</p>
            </div>
             <div className="grid gap-4 md:grid-cols-3 mb-8">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Performance Score</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">91%</div>
                        <p className="text-xs text-muted-foreground">+2% from last month</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tasks Completed (Month)</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">75</div>
                         <p className="text-xs text-muted-foreground">3 tasks overdue</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Goals In Progress</CardTitle>
                        <ListTodo className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                         <p className="text-xs text-muted-foreground">1 nearing deadline</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Monthly Task Completion</CardTitle>
                        <CardDescription>Your completed vs. pending tasks over the last four weeks.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={weeklyCompletionData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="week" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="completed" stackId="a" fill="hsl(var(--primary))" name="Completed" />
                                <Bar dataKey="pending" stackId="a" fill="hsl(var(--secondary))" name="Pending" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>KPI Achievement Trends</CardTitle>
                        <CardDescription>Your performance against key metrics over time.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                           <LineChart data={kpiTrendData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Customer Satisfaction" stroke="hsl(var(--chart-1))" />
                                <Line type="monotone" dataKey="Response Time" stroke="hsl(var(--chart-2))" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}


export default function PerformancePage() {
    const { userData } = useAuth();
    
    // Admins see the high-level performance overview
    if (userData?.role === 'admin') {
        return <PerformanceOverview />;
    }

    // Employees see their personal performance dashboard
    return <EmployeePerformance />;
}
