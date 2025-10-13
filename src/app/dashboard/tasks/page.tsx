
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, CheckCircle, Clock, Lightbulb, Calendar, List } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

type TaskStatus = "Pending" | "In Progress" | "Submitted" | "Completed" | "Overdue";

const tasks = [
    { id: 1, title: "Prepare Q4 presentation", project: "Marketing Campaign", priority: "High", due: "2024-10-25", status: "In Progress" as TaskStatus },
    { id: 2, title: "Update client contact list", project: "Admin", priority: "Medium", due: "2024-10-22", status: "Pending" as TaskStatus },
    { id: 3, title: "Fix login page bug", project: "Website Revamp", priority: "High", due: "2024-10-20", status: "Submitted" as TaskStatus },
    { id: 4, title: "Design new ad creatives", project: "Marketing Campaign", priority: "Medium", due: "2024-10-18", status: "Completed" as TaskStatus },
    { id: 5, title: "Draft monthly newsletter", project: "Content Creation", priority: "Low", due: "2024-10-15", status: "Overdue" as TaskStatus },
    { id: 6, title: "Review pull request #123", project: "Website Revamp", priority: "High", due: "2024-10-21", status: "In Progress" as TaskStatus },
];

const getStatusBadgeVariant = (status: TaskStatus) => {
    switch (status) {
        case "Completed": return "default";
        case "In Progress": return "secondary";
        case "Submitted": return "outline";
        case "Overdue": return "destructive";
        default: return "secondary";
    }
}

export default function TasksPage() {
    const [taskList, setTaskList] = useState(tasks);

    const handleStatusChange = (taskId: number, newStatus: TaskStatus) => {
        setTaskList(currentTasks => 
            currentTasks.map(task => 
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        );
    };

    return (
        <>
            <Card className="mb-8 bg-amber-50 border-amber-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-amber-800">
                        <Lightbulb className="h-5 w-5" />
                        AI Suggested Next Task
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="font-medium text-amber-900">"Finalize user authentication flow"</p>
                    <p className="text-sm text-amber-700 mt-1">Based on your recent work on the 'Website Revamp' project, completing this task would be most efficient and help you meet the upcoming milestone.</p>
                     <Button variant="secondary" size="sm" className="mt-4">Start Task</Button>
                </CardContent>
            </Card>

            <Tabs defaultValue="list">
                <div className="flex items-center justify-between mb-4">
                     <div>
                        <h1 className="text-3xl font-bold">My Task Management</h1>
                        <p className="text-muted-foreground">View, update, and submit your assigned tasks.</p>
                     </div>
                    <TabsList>
                        <TabsTrigger value="list"><List className="mr-2 h-4 w-4" />List View</TabsTrigger>
                        <TabsTrigger value="calendar"><Calendar className="mr-2 h-4 w-4" />Calendar View</TabsTrigger>
                    </TabsList>
                </div>
               
                <TabsContent value="list">
                     <Card>
                        <CardHeader>
                            <CardTitle>My Task List</CardTitle>
                            <CardDescription>A complete list of your assigned tasks.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Task Title</TableHead>
                                        <TableHead>Project</TableHead>
                                        <TableHead>Priority</TableHead>
                                        <TableHead>Due Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {taskList.map(task => (
                                        <TableRow key={task.id}>
                                            <TableCell className="font-medium">{task.title}</TableCell>
                                            <TableCell>{task.project}</TableCell>
                                            <TableCell>
                                                <Badge variant={task.priority === 'High' ? 'destructive' : task.priority === 'Medium' ? 'secondary' : 'outline'}>{task.priority}</Badge>
                                            </TableCell>
                                            <TableCell>{task.due}</TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusBadgeVariant(task.status)}>{task.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onSelect={() => handleStatusChange(task.id, 'In Progress')}>
                                                            <Clock className="mr-2 h-4 w-4" /> Mark as In Progress
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onSelect={() => handleStatusChange(task.id, 'Submitted')}>
                                                            <CheckCircle className="mr-2 h-4 w-4" /> Submit for Review
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="calendar">
                     <Card>
                        <CardHeader>
                            <CardTitle>Task Calendar</CardTitle>
                            <CardDescription>Your tasks and deadlines on a calendar.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px] flex items-center justify-center bg-muted/50 rounded-lg">
                                <p className="text-muted-foreground">Interactive calendar component would be rendered here.</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    )
}
