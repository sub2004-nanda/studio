
"use client";

import { UserData } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { auth, db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, LogOut, UserPlus, MoreVertical, Edit } from "lucide-react";
import { useUsers } from "@/hooks/use-users";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AddUserDialog } from "@/components/admin/add-user-dialog";
import { useToast } from "@/hooks/use-toast";

function getInitials(name: string) {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

export default function AdminDashboard({ user, userData }: { user: any; userData: UserData | null; }) {
    const { users, loading } = useUsers();
    const { toast } = useToast();

    const handleRoleChange = async (uid: string, role: UserData['role']) => {
        try {
            const userDocRef = doc(db, "users", uid);
            await updateDoc(userDocRef, { role });
            toast({
                title: "User Updated",
                description: `User role has been changed to ${role}.`,
            });
        } catch (error) {
            console.error("Error updating user role:", error);
            toast({
                title: "Error",
                description: "Could not update user role.",
                variant: "destructive",
            });
        }
    };
    
    const handleStatusChange = async (uid: string, status: UserData['status']) => {
        try {
            const userDocRef = doc(db, "users", uid);
            await updateDoc(userDocRef, { status });
            toast({
                title: "User Updated",
                description: `User status has been changed to ${status}.`,
            });
        } catch (error) {
            console.error("Error updating user status:", error);
            toast({
                title: "Error",
                description: "Could not update user status.",
                variant: "destructive",
            });
        }
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
                    <Button variant="outline" size="icon" onClick={() => auth.signOut()}>
                        <LogOut className="h-4 w-4" />
                        <span className="sr-only">Logout</span>
                    </Button>
                 </div>
            </header>
            <main className="flex-1 p-4 sm:px-6 sm:py-0">
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
                                                        <DropdownMenuItem onSelect={() => handleRoleChange(u.uid, 'admin')}>Assign as Admin</DropdownMenuItem>
                                                        <DropdownMenuItem onSelect={() => handleRoleChange(u.uid, 'manager')}>Assign as Manager</DropdownMenuItem>
                                                        <DropdownMenuItem onSelect={() => handleRoleChange(u.uid, 'employee')}>Assign as Employee</DropdownMenuItem>
                                                        <DropdownMenuItem onSelect={() => handleStatusChange(u.uid, 'approved')}>Approve User</DropdownMenuItem>
                                                        <DropdownMenuItem onSelect={() => handleStatusChange(u.uid, 'pending_approval')}>Set as Pending</DropdownMenuItem>
                                                        <DropdownMenuItem onSelect={() => handleStatusChange(u.uid, 'rejected')}>Reject User</DropdownMenuItem>
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
            </main>
        </div>
    );
}
