
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Download, Search, ShieldAlert, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type AuditLog = {
    id: string;
    user: {
        name: string;
        email: string;
    };
    action: 'View' | 'Edit' | 'Export' | 'Login' | 'Delete';
    targetType: string;
    target: string;
    ipAddress: string;
    timestamp: Date;
};

const auditLogsData: AuditLog[] = [
    { id: 'log1', user: { name: 'Alice Johnson', email: 'alice@example.com' }, action: 'View', targetType: 'Report', target: 'Q3 Department Summary', ipAddress: '192.168.1.10', timestamp: new Date('2023-10-26T10:00:00Z') },
    { id: 'log2', user: { name: 'Bob Williams', email: 'bob@example.com' }, action: 'Edit', targetType: 'User', target: 'Charlie Brown', ipAddress: '203.0.113.25', timestamp: new Date('2023-10-26T09:45:12Z') },
    { id: 'log3', user: { name: 'Alice Johnson', email: 'alice@example.com' }, action: 'Export', targetType: 'Dataset', target: 'All Employees', ipAddress: '192.168.1.10', timestamp: new Date('2023-10-26T09:30:05Z') },
    { id: 'log4', user: { name: 'David Garcia', email: 'david@example.com' }, action: 'Login', targetType: 'System', target: 'Successful Login', ipAddress: '198.51.100.2', timestamp: new Date('2023-10-26T09:15:44Z') },
    { id: 'log5', user: { name: 'Bob Williams', email: 'bob@example.com' }, action: 'Delete', targetType: 'Document', target: 'Project Phoenix Specs', ipAddress: '203.0.113.25', timestamp: new Date('2023-10-25T17:22:30Z') },
];

function getInitials(name: string) {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

const getActionBadgeVariant = (action: AuditLog['action']) => {
    switch (action) {
        case 'View': return 'secondary';
        case 'Edit': return 'default';
        case 'Export': return 'outline';
        case 'Delete': return 'destructive';
        default: return 'secondary';
    }
}

export default function PrivacyPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Data Privacy & Transparency</h1>
                <p className="text-muted-foreground">Review who has accessed what data and when. This page is for building trust and ensuring accountability.</p>
            </div>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Potential Anomalies</CardTitle>
                    <CardDescription>AI-detected events that may require your attention.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                     <div className="p-4 border rounded-lg bg-amber-50 border-amber-200 text-amber-900">
                        <div className="flex items-center gap-3">
                            <ShieldAlert className="h-5 w-5" />
                            <h3 className="font-semibold text-base">Unusual Login Location</h3>
                        </div>
                        <p className="text-sm mt-2 ml-8">User 'Bob Williams' logged in from a new country (IP: 104.28.212.69) at 03:15 AM.</p>
                     </div>
                     <div className="p-4 border rounded-lg bg-amber-50 border-amber-200 text-amber-900">
                         <div className="flex items-center gap-3">
                            <ShieldAlert className="h-5 w-5" />
                            <h3 className="font-semibold text-base">Bulk Data Export</h3>
                        </div>
                        <p className="text-sm mt-2 ml-8">User 'Alice Johnson' exported the 'All Employees' dataset, which is a rare action.</p>
                     </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Data Access Audit Log</CardTitle>
                    <CardDescription>A detailed log of all data access and modification events across the platform.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                        <div className="relative flex-1 w-full sm:max-w-xs">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search logs by user or target..." className="pl-8" />
                        </div>
                         <Select>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by action" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Actions</SelectItem>
                                <SelectItem value="View">View</SelectItem>
                                <SelectItem value="Edit">Edit</SelectItem>
                                <SelectItem value="Export">Export</SelectItem>
                                <SelectItem value="Delete">Delete</SelectItem>
                                <SelectItem value="Login">Login</SelectItem>
                            </SelectContent>
                        </Select>
                        <Popover>
                            <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn("w-full sm:w-auto justify-start text-left font-normal", !date && "text-muted-foreground")}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>Target</TableHead>
                                <TableHead>IP Address</TableHead>
                                <TableHead className="text-right">Timestamp</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {auditLogsData.map(log => (
                                <TableRow key={log.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={`https://avatar.vercel.sh/${log.user.email}.png`} alt={log.user.name} />
                                                <AvatarFallback>{getInitials(log.user.name)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{log.user.name}</p>
                                                <p className="text-xs text-muted-foreground">{log.user.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={getActionBadgeVariant(log.action)}>{log.action}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <p className="font-medium">{log.target}</p>
                                        <p className="text-xs text-muted-foreground">{log.targetType}</p>
                                    </TableCell>
                                    <TableCell>{log.ipAddress}</TableCell>
                                    <TableCell className="text-right">{format(log.timestamp, "PPp")}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Export Log (CSV)
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}
