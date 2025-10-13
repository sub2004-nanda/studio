
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, PlusCircle, MoreVertical } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { AddKpiDialog } from "./add-kpi-dialog";

const kpis = [
    { id: '1', name: 'File Disposal Rate', category: 'Administrative', role: 'HQ Staff', weightage: '30%', target: '50 files/month' },
    { id: '2', name: 'Customer Satisfaction', category: 'Support', role: 'All', weightage: '20%', target: '95% CSAT' },
    { id: '3', name: 'Code Quality Score', category: 'Technical', role: 'Developer', weightage: '40%', target: '>90 SonarQube' },
    { id: '4', name: 'Sales Qualified Leads', category: 'Sales', role: 'Manager', weightage: '50%', target: '20 per week' },
    { id: '5', name: 'On-time Delivery', category: 'Project-related', role: 'All', weightage: '25%', target: '98%' },
];

export default function KpiManagement() {
    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">KPI Management</h1>
                    <p className="text-muted-foreground">Define and standardize Key Performance Indicators for roles.</p>
                </div>
                 <AddKpiDialog>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create KPI
                    </Button>
                </AddKpiDialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Existing KPIs</CardTitle>
                    <CardDescription>View, edit, or delete the KPIs used across the organization.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>KPI Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Assigned Role</TableHead>
                                <TableHead>Weightage</TableHead>
                                <TableHead>Target</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {kpis.map(kpi => (
                                <TableRow key={kpi.id}>
                                    <TableCell className="font-medium">{kpi.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{kpi.category}</Badge>
                                    </TableCell>
                                    <TableCell>
                                         <Badge variant="outline">{kpi.role}</Badge>
                                    </TableCell>
                                    <TableCell>{kpi.weightage}</TableCell>
                                    <TableCell>{kpi.target}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Edit KPI</DropdownMenuItem>
                                                <DropdownMenuItem>View History</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Delete KPI</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}
