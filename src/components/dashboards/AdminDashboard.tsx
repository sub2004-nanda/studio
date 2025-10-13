
"use client";

import { UserData } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useAuth as useFirebaseAuth, useFirestore } from "@/firebase/provider";
import { doc, updateDoc } from "firebase/firestore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, LogOut, UserPlus, MoreVertical, Activity, Users } from "lucide-react";
import { useUsers } from "@/hooks/use-users";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AddUserDialog } from "@/components/admin/add-user-dialog";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PerformanceOverview from "@/components/admin/performance-overview";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError, SecurityRuleContext } from "@/firebase/errors";
import AssignProject from "../admin/assign-project";

function getInitials(name: string) {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function UserManagementTable({ users, loading, onRoleChange, onStatusChange }: { users: UserData[], loading: boolean, onRoleChange: (uid: string, role: UserData['role']) => void, onStatusChange: (uid: string, status: UserData['status']) => void }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>View, add, and manage all users in the system.</CardDescription>
                </div>
                <AddUserDialog>
                    <Button>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add User
                    </Button>
                </AddUserDialog>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">Loading users...</TableCell>
                            </TableRow>
                        ) : (
                            users.map(u => (
                                <TableRow key={u.uid}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={`https://avatar.vercel.sh/${u.email}.png`} alt={u.name} />
                                                <AvatarFallback>{getInitials(u.name)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{u.name}</p>
                                                <p className="text-sm text-muted-foreground">{u.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge 
                                            variant={u.role === 'admin' ? 'default' : u.role === 'manager' ? 'secondary' : 'outline'}
                                            className="capitalize"
                                        >
                                            {u.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={u.status === 'approved' ? 'default' : u.status === 'pending_approval' ? 'secondary' : 'destructive'}
                                            className={`capitalize ${u.status === 'approved' ? 'bg-green-100 text-green-800' : u.status === 'pending_approval' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}
                                        >
                                            {u.status.replace(/_/g, ' ')}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onSelect={() => onRoleChange(u.uid, 'admin')}>Assign as Admin</DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => onRoleChange(u.uid, 'manager')}>Assign as Manager</DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => onRoleChange(u.uid, 'employee')}>Assign as Employee</DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => onStatusChange(u.uid, 'approved')}>Approve User</DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => onStatusChange(u.uid, 'pending_approval')}>Set as Pending</DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => onStatusChange(u.uid, 'rejected')}>Reject User</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default function AdminDashboard({ user, userData }: { user: any; userData: UserData | null; }) {
    const { users, loading } = useUsers();
    const { toast } = useToast();
    const db = useFirestore();
    const auth = useFirebaseAuth();
    const managers = users.filter(u => u.role === 'manager');

    const handleLogout = () => {
        if (auth) {
            auth.signOut();
        }
    }

    const handleRoleChange = async (uid: string, role: UserData['role']) => {
        if (!db) return;
        const userDocRef = doc(db, "users", uid);
        const updateData = { role };
        updateDoc(userDocRef, updateData)
            .then(() => {
                toast({
                    title: "User Updated",
                    description: `User role has been changed to ${role}.`,
                });
            })
            .catch(async (serverError) => {
                const permissionError = new FirestorePermissionError({
                    path: userDocRef.path,
                    operation: 'update',
                    requestResourceData: updateData,
                } satisfies SecurityRuleContext);
                errorEmitter.emit('permission-error', permissionError);
                toast({
                    title: "Permission Denied",
                    description: "You don't have permission to change user roles.",
                    variant: "destructive",
                });
            });
    };
    
    const handleStatusChange = async (uid: string, status: UserData['status']) => {
        if (!db) return;
        const userDocRef = doc(db, "users", uid);
        const updateData = { status };
        await updateDoc(userDocRef, updateData)
            .then(() => {
                toast({
                    title: "User Updated",
                    description: `User status has been changed to ${status}.`,
                });
            })
            .catch(async (serverError) => {
                 const permissionError = new FirestorePermissionError({
                    path: userDocRef.path,
                    operation: 'update',
                    requestResourceData: updateData,
                } satisfies SecurityRuleContext);
                errorEmitter.emit('permission-error', permissionError);
                toast({
                    title: "Permission Denied",
                    description: "You don't have permission to change user status.",
                    variant: "destructive",
                });
            });
    };

    return (
        <div className="flex min-h-screen flex-col bg-muted/40">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                 <div className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-primary"/>
                    <h1 className="font-headline text-xl font-semibold">Admin Dashboard</h1>
                 </div>
                 <div className="ml-auto flex items-center gap-4">
                    <div className="text-right">
                        <p className="font-semibold">{userData?.name}</p>
                        <p className="text-xs text-muted-foreground">{userData?.email}</p>
                    </div>
                    <Button variant="outline" size="icon" onClick={handleLogout}>
                        <LogOut className="h-4 w-4" />
                        <span className="sr-only">Logout</span>
                    </Button>
                 </div>
            </header>
            <main className="flex-1 p-4 sm:px-6 sm:py-0">
                 <Tabs defaultValue="overview">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="overview">
                             <Activity className="mr-2 h-4 w-4"/>
                            Performance Overview
                        </TabsTrigger>
                        <TabsTrigger value="users">
                            <Users className="mr-2 h-4 w-4"/>
                            User Management
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <PerformanceOverview />
                    </TabsContent>
                    <TabsContent value="users" className="space-y-4">
                        <UserManagementTable 
                            users={users} 
                            loading={loading}
                            onRoleChange={handleRoleChange}
                            onStatusChange={handleStatusChange}
                        />
                        <AssignProject managers={managers} />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
