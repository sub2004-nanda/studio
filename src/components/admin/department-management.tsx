
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, UserPlus, MoreVertical, BarChart2, FolderKanban, Users2, Loader2 } from "lucide-react";
import { AddDepartmentDialog } from "./add-department-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useDepartments } from "@/hooks/use-departments";
import { useUsers } from "@/hooks/use-users";
import { useMemo } from "react";

const DepartmentStat = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span>{label}: <strong>{value}</strong></span>
    </div>
)

export default function DepartmentManagement() {
    const { departments, loading: departmentsLoading } = useDepartments();
    const { users, loading: usersLoading } = useUsers();

    const departmentsWithDetails = useMemo(() => {
        return departments.map(dept => {
            const manager = users.find(u => u.uid === dept.managerUid);
            const employeeCount = users.filter(u => u.departmentId === dept.id).length;
            return {
                ...dept,
                head: manager?.name || 'Unassigned',
                employees: employeeCount,
                // These are placeholders for now
                avgProductivity: 'N/A', 
                projects: 0
            }
        })
    }, [departments, users]);

    const loading = departmentsLoading || usersLoading;

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
                {loading && (
                    <Card className="flex items-center justify-center col-span-full h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </Card>
                )}
                {!loading && departmentsWithDetails.map(dept => (
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
                 <Card className="border-dashed flex flex-col items-center justify-center gap-4 min-h-[260px]">
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
