
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, UserPlus, MoreVertical, BarChart2, FolderKanban, Users2, Loader2 } from "lucide-react";
import { AddDepartmentDialog } from "./add-department-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useDepartments } from "@/hooks/use-departments";
import { useUsers } from "@/hooks/use-users";
import { useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "../ui/badge";

const DepartmentStat = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span>{label}: <strong>{value}</strong></span>
    </div>
);

function getInitials(name: string) {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}


function DepartmentManagementContent() {
    const { departments, loading: departmentsLoading } = useDepartments();
    const { users, loading: usersLoading } = useUsers();

    const departmentsWithDetails = useMemo(() => {
        if (departmentsLoading || usersLoading) return [];
        return departments.map(dept => {
            const manager = users.find(u => u.uid === dept.managerUid);
            const employeesInDept = users.filter(u => u.departmentId === dept.id);
            return {
                ...dept,
                head: manager?.name || 'Unassigned',
                employees: employeesInDept,
                avgProductivity: 'N/A',
                projects: 0
            }
        })
    }, [departments, users, departmentsLoading, usersLoading]);

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

            {loading && (
                <Card className="flex items-center justify-center col-span-full h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </Card>
            )}
            
            <Accordion type="single" collapsible className="w-full space-y-4">
                 {!loading && departmentsWithDetails.map(dept => (
                    <AccordionItem value={dept.id} key={dept.id} className="border-b-0">
                         <Card>
                            <AccordionTrigger className="hover:no-underline">
                                <CardHeader className="flex flex-row items-center justify-between w-full space-y-0 p-4">
                                    <div className="text-left">
                                        <CardTitle>{dept.name}</CardTitle>
                                        <CardDescription>
                                            <span className="font-medium">Head:</span> {dept.head}
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-6 pr-4">
                                        <div className="hidden md:flex items-center gap-6">
                                            <DepartmentStat icon={BarChart2} label="Productivity" value={dept.avgProductivity} />
                                            <DepartmentStat icon={FolderKanban} label="Projects" value={dept.projects} />
                                            <DepartmentStat icon={Users2} label="Employees" value={dept.employees.length} />
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
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
                                    </div>
                                </CardHeader>
                            </AccordionTrigger>
                            <AccordionContent>
                                <CardContent className="pt-0 p-4">
                                    <h4 className="font-semibold mb-3">Team Members ({dept.employees.length})</h4>
                                    {dept.employees.length > 0 ? (
                                        <div className="space-y-3">
                                            {dept.employees.map(employee => (
                                                <div key={employee.uid} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-9 w-9">
                                                            <AvatarImage src={`https://avatar.vercel.sh/${employee.email}.png`} alt={employee.name} />
                                                            <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-medium text-sm">{employee.name}</p>
                                                            <p className="text-xs text-muted-foreground">{employee.email}</p>
                                                        </div>
                                                    </div>
                                                    <Badge variant={employee.uid === dept.managerUid ? 'default' : 'secondary'}>
                                                        {employee.uid === dept.managerUid ? 'Manager' : 'Employee'}
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No employees have been assigned to this department yet.</p>
                                    )}
                                </CardContent>
                            </AccordionContent>
                        </Card>
                    </AccordionItem>
                 ))}
             </Accordion>

            {!loading && (
                 <Card className="border-dashed flex flex-col items-center justify-center gap-4 min-h-[160px] mt-6">
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
             )}
        </>
    );
}


export default function DepartmentManagement() {
    const { userData, status } = useAuth();

    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (userData?.role === 'admin') {
        return <DepartmentManagementContent />;
    }

    // Fallback for non-admins, though they shouldn't reach this page via nav.
    return (
        <Card>
            <CardHeader>
                <CardTitle>Access Denied</CardTitle>
                <CardDescription>You do not have permission to view this page.</CardDescription>
            </CardHeader>
        </Card>
    );
}
