
"use client";

import { UserData } from '@/hooks/use-auth';
import { Button } from "@/components/ui/button";
import { useFirestore, useAuth as useFirebaseAuth } from "@/firebase/provider";
import { doc, updateDoc } from "firebase/firestore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPlus, MoreVertical, ArrowLeft } from "lucide-react";
import { useUsers } from "@/hooks/use-users";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AddUserDialog } from "@/components/admin/add-user-dialog";
import { useToast } from "@/hooks/use-toast";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError, SecurityRuleContext } from "@/firebase/errors";
import Link from 'next/link';

function getInitials(name: string) {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

export default function UserManagementPage() {
    const { users, loading } = useUsers();
    const { toast } = useToast();
    const db = useFirestore();

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
        <div className="flex min-h-screen flex-col bg-muted/40 p-4 sm:p-6">
            <div className="mb-4">
                <Link href="/dashboard" passHref>
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Button>
                </Link>
            </div>
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
        </div>
    );
}
