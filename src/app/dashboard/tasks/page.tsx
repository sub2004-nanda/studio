
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, CheckCircle, Clock } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

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
        <Card>
            <CardHeader>
                <CardTitle>My Task Management</CardTitle>
                <CardDescription>View, update, and submit your assigned tasks.</CardDescription>
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
    )
}
