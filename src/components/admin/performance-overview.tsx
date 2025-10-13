
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, CheckCircle, TrendingUp, Users } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const teamData = [
  { name: 'Engineering', performance: 92 },
  { name: 'Marketing', performance: 88 },
  { name: 'Sales', performance: 78 },
  { name: 'Support', performance: 95 },
  { name: 'Design', performance: 85 },
];

const goalData = [
  { name: 'Completed', value: 400 },
  { name: 'Pending', value: 150 },
  { name: 'Overdue', value: 50 },
];
const COLORS = ['#0088FE', '#FFBB28', '#FF8042'];

const departmentRanks = [
    { rank: 1, name: 'Support', kpiScore: 95, goalsMet: '98%' },
    { rank: 2, name: 'Engineering', kpiScore: 92, goalsMet: '95%' },
    { rank: 3, name: 'Marketing', kpiScore: 88, goalsMet: '90%' },
    { rank: 4, name: 'Design', kpiScore: 85, goalsMet: '88%' },
    { rank: 5, name: 'Sales', kpiScore: 78, goalsMet: '80%' },
]


export default function PerformanceOverview() {
    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Performance Command Center</h1>
                <p className="text-muted-foreground">An overview of organizational health, trends, and alerts.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overall Productivity</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">+5.2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Goals Completed</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+1,234</div>
                  <p className="text-xs text-muted-foreground">+18% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">128</div>
                  <p className="text-xs text-muted-foreground">+5 since last hour</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Alerts</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">2 for low performance</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Department Performance Comparison</CardTitle>
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
                  <CardTitle>Organizational Goal Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={goalData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                            {goalData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                         <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
               <Card className="lg:col-span-5">
                <CardHeader>
                  <CardTitle>Department Rankings</CardTitle>
                  <CardDescription>Auto-calculated ranks based on KPIs and goal achievement.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Rank</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Average KPI Score</TableHead>
                                <TableHead>Goals Met</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {departmentRanks.map(dept => (
                                <TableRow key={dept.rank}>
                                    <TableCell className="font-bold text-lg">{dept.rank}</TableCell>
                                    <TableCell>{dept.name}</TableCell>
                                    <TableCell>{dept.kpiScore}</TableCell>
                                    <TableCell>{dept.goalsMet}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
              </Card>
            </div>
        </>
    )
}
