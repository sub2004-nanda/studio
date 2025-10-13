
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, UserPlus, MoreVertical, BarChart2, FolderKanban, Users, Users2 } from "lucide-react";
import { AddDepartmentDialog } from "./add-department-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

const departments = [
    { id: '1', name: 'Engineering', head: 'Alice Johnson', avgProductivity: '92%', projects: 5, employees: 12 },
    { id: '2', name: 'Marketing', head: 'Bob Williams', avgProductivity: '88%', projects: 3, employees: 8 },
    { id: '3', name: 'Sales', head: 'Charlie Brown', avgProductivity: '78%', projects: 8, employees: 15 },
    { id: '4', name: 'Support', head: 'Diana Miller', avgProductivity: '95%', projects: 2, employees: 10 },
];

const DepartmentStat = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span>{label}: <strong>{value}</strong></span>
    </div>
)

export default function DepartmentManagement() {
    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Department Management</h1>
                    <p className="text-muted-foreground">Define departments, link managers, and group employees.</p>
                </div>
                <AddDepartmentDialog>
                    <Button>
                        <Building className="mr-2 h-4 w-4" />
                        Create Department
                    </Button>
                </AddDepartmentDialog>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {departments.map(dept => (
                    <Card key={dept.id}>
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                            <div>
                                <CardTitle>{dept.name}</CardTitle>
                                <CardDescription>
                                    <span className="font-medium">Head:</span> {dept.head}
                                </CardDescription>
                            </div>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Edit Department</DropdownMenuItem>
                                    <DropdownMenuItem>Assign Employees</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">Delete Department</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="space-y-2">
                                <DepartmentStat icon={BarChart2} label="Avg. Productivity" value={dept.avgProductivity} />
                                <DepartmentStat icon={FolderKanban} label="Ongoing Projects" value={dept.projects} />
                                <DepartmentStat icon={Users2} label="Active Employees" value={dept.employees} />
                           </div>
                           <Button variant="outline" className="w-full">View Details</Button>
                        </CardContent>
                    </Card>
                ))}
                 <Card className="border-dashed flex flex-col items-center justify-center gap-4">
                    <div className="text-center">
                        <h3 className="text-lg font-medium">Create a New Department</h3>
                        <p className="text-sm text-muted-foreground">Organize your teams and projects.</p>
                    </div>
                    <AddDepartmentDialog>
                        <Button variant="outline">
                            <UserPlus className="mr-2 h-4 w-4" /> Add Department
                        </Button>
                    </AddDepartmentDialog>
                </Card>
            </div>
        </>
    );
}
