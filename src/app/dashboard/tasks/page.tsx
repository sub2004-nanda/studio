
"use client";

import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, CheckCircle, Clock, Lightbulb, Calendar as CalendarIcon, List, ThumbsUp, MessageSquare, Loader2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { parseISO, isSameDay } from 'date-fns';
import { useManagerData, useTeamTasks } from '@/hooks/use-manager-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


type TaskStatus = "Pending" | "In Progress" | "Submitted" | "Completed" | "Overdue";

const tasks = [
    { id: 1, title: "Prepare Q4 presentation", project: "Marketing Campaign", priority: "High", due: "2025-10-28", status: "In Progress" as TaskStatus, assignee: 'Ankit'},
    { id: 2, title: "Update client contact list", project: "Admin", priority: "Medium", due: "2025-10-29", status: "Pending" as TaskStatus, assignee: 'Subrat'},
    { id: 3, title: "Fix login page bug", project: "Website Revamp", priority: "High", due: "2025-10-24", status: "Submitted" as TaskStatus, assignee: 'Deepika'},
    { id: 4, title: "Design new ad creatives", project: "Marketing Campaign", priority: "Medium", due: "2025-10-22", status: "Completed" as TaskStatus, assignee: 'Ankit'},
    { id: 5, title: "Draft monthly newsletter", project: "Content Creation", priority: "Low", due: "2025-10-15", status: "Overdue" as TaskStatus, assignee: 'Anjan' },
    { id: 6, title: "Review pull request #123", project: "Website Revamp", priority: "High", due: "2025-10-25", status: "In Progress" as TaskStatus, assignee: 'Deepika' },
    { id: 7, title: "Plan team offsite event", project: "HR", priority: "Medium", due: "2025-11-05", status: "Pending" as TaskStatus, assignee: 'Subrat'},
    { id: 8, title: "Finalize user authentication flow", project: "Website Revamp", priority: "High", due: "2025-11-15", status: "Submitted" as TaskStatus, assignee: 'Ankit' },
    { id: 9, title: "Submit expense report for October", project: "Admin", priority: "Low", due: "2025-10-20", status: "Completed" as TaskStatus, assignee: 'Omnshu' },
    { id: 10, title: "Finalize 2025 budget proposal", project: "Finance", priority: "High", due: "2025-11-10", status: "Submitted" as TaskStatus, assignee: 'Ankit' },
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

function getInitials(name: string) {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}


function EmployeeTasksPage() {
    const { userData } = useAuth();
    const [taskList, setTaskList] = useState(() => tasks.filter(t => t.assignee === userData?.name || !t.assignee)); // Simplified filter for demo
    const [date, setDate] = useState<Date | undefined>(new Date());
    
    const taskDueDates = taskList.map(task => parseISO(task.due));

    const handleStatusChange = (taskId: number, newStatus: TaskStatus) => {
        setTaskList(currentTasks => 
            currentTasks.map(task => 
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        );
    };

    const selectedDayTasks = useMemo(() => {
        if (!date) return [];
        return taskList.filter(task => isSameDay(parseISO(task.due), date));
    }, [date, taskList]);

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
                     <Button variant="secondary" size="sm" className="mt-4" onClick={() => handleStatusChange(8, 'In Progress')}>Start Task</Button>
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
                        <TabsTrigger value="calendar"><CalendarIcon className="mr-2 h-4 w-4" />Calendar View</TabsTrigger>
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
                            <CardDescription>Your tasks and deadlines on a calendar. Select a date to see its tasks.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="flex justify-center">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    modifiers={{ due: taskDueDates }}
                                    modifiersClassNames={{
                                    due: 'bg-primary/20 rounded-full',
                                    }}
                                    className="rounded-md border"
                                />
                            </div>
                             <div>
                                <h3 className="text-lg font-semibold mb-4">Tasks for {date ? date.toLocaleDateString() : 'Selected Day'}</h3>
                                {selectedDayTasks.length > 0 ? (
                                    <div className="space-y-4">
                                        {selectedDayTasks.map(task => (
                                            <div key={task.id} className="p-4 border rounded-lg bg-muted/50">
                                                <div className="flex justify-between items-start">
                                                    <p className="font-semibold">{task.title}</p>
                                                    <Badge variant={task.priority === 'High' ? 'destructive' : task.priority === 'Medium' ? 'secondary' : 'outline'}>{task.priority}</Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">Project: {task.project}</p>
                                                <div className="mt-2">
                                                    <Badge variant={getStatusBadgeVariant(task.status)}>{task.status}</Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-center p-8 border-dashed border-2 rounded-lg">
                                        <p className="text-muted-foreground">No tasks due on this day.</p>
                                        <p className="text-sm text-muted-foreground mt-1">Select another date to view tasks.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    )
}

function ManagerTaskReviewPage() {
    const { userData } = useAuth();
    const { teamMembers, loading: membersLoading } = useManagerData(userData);
    const { tasks: allTeamTasks, loading: tasksLoading } = useTeamTasks(teamMembers);
    const [tasks, setTasks] = useState(allTeamTasks);

    useEffect(() => {
        setTasks(allTeamTasks);
    }, [allTeamTasks]);

    const submittedTasks = useMemo(() => {
        return tasks.filter(task => task.status === 'Submitted');
    }, [tasks]);

    const handleTaskUpdate = (taskId: number, newStatus: TaskStatus) => {
         setTasks(currentTasks => 
            currentTasks.map(task => 
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        );
    }

    const loading = membersLoading || tasksLoading;

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
                <h1 className="text-3xl font-bold">Task Review</h1>
                <p className="text-muted-foreground">Review and approve tasks submitted by your team members.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Pending Reviews ({submittedTasks.length})</CardTitle>
                    <CardDescription>These tasks have been submitted and are awaiting your approval.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Task Title</TableHead>
                                <TableHead>Project</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {submittedTasks.map(task => {
                                const member = teamMembers.find(m => m.name === task.assignee);
                                return (
                                    <TableRow key={task.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                 <Avatar className="h-9 w-9">
                                                    <AvatarImage src={`https://avatar.vercel.sh/${member?.email}.png`} alt={member?.name} />
                                                    <AvatarFallback>{getInitials(member?.name || '?')}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium">{task.assignee}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{task.title}</TableCell>
                                        <TableCell>{task.project}</TableCell>
                                        <TableCell>{task.due}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex gap-2 justify-end">
                                                <Button variant="outline" size="sm" onClick={() => handleTaskUpdate(task.id, 'In Progress')}>
                                                    <MessageSquare className="mr-2 h-4 w-4" />
                                                    Request Changes
                                                </Button>
                                                <Button size="sm" onClick={() => handleTaskUpdate(task.id, 'Completed')}>
                                                     <ThumbsUp className="mr-2 h-4 w-4" />
                                                    Approve
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                             {submittedTasks.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        No tasks are currently pending review. Great job, team!
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}


export default function TasksPage() {
    const { userData, status } = useAuth();
    
    if (status === 'loading') {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }
    
    // Managers see the review interface
    if (userData?.role === 'manager' || userData?.role === 'admin') {
        return <ManagerTaskReviewPage />;
    }

    // Employees see their own tasks
    return <EmployeeTasksPage />;
}

    

    