
"use client";

import { useState, useMemo } from 'react';
import { UserData } from '@/hooks/use-auth';
import { Button } from "@/components/ui/button";
import { useFirestore } from "@/firebase/provider";
import { doc, updateDoc } from "firebase/firestore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPlus, MoreVertical, Upload } from "lucide-react";
import { useUsers } from "@/hooks/use-users";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { AddUserDialog } from "@/components/admin/add-user-dialog";
import { useToast } from "@/hooks/use-toast";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError, SecurityRuleContext } from "@/firebase/errors";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function getInitials(name: string) {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

export default function UserManagementPage() {
    const { users, loading } = useUsers();
    const { toast } = useToast();
    const db = useFirestore();
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

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

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRole = roleFilter === 'all' || user.role === roleFilter;
            const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [users, searchTerm, roleFilter, statusFilter]);

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <CardTitle>User Management</CardTitle>
                        <CardDescription>View, add, and manage all users in the system.</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Upload className="mr-2 h-4 w-4" />
                            Bulk Upload
                        </Button>
                        <AddUserDialog>
                            <Button>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Add User
                            </Button>
                        </AddUserDialog>
                    </div>
                </div>
                 <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <Input
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                    />
                    <div className="flex gap-4">
                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Roles</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="manager">Manager</SelectItem>
                                <SelectItem value="employee">Employee</SelectItem>
                                <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="pending_approval">Pending</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
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
                            filteredUsers.map(u => (
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
                                                <DropdownMenuItem>Edit User</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onSelect={() => handleStatusChange(u.uid, 'approved')}>Approve</DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => handleStatusChange(u.uid, 'pending_approval')}>Set as Pending</DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => handleStatusChange(u.uid, 'rejected')}>Reject / Deactivate</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onSelect={() => handleRoleChange(u.uid, 'admin')}>Assign as Admin</DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => handleRoleChange(u.uid, 'manager')}>Assign as Manager</DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => handleRoleChange(u.uid, 'employee')}>Assign as Employee</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Delete User</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                        {!loading && filteredUsers.length === 0 && (
                             <TableRow>
                                <TableCell colSpan={4} className="text-center">No users found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
