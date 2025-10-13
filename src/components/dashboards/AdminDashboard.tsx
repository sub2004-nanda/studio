
"use client";

import { UserData } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, LogOut } from "lucide-react";
import { useUsers } from "@/hooks/use-users";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('');
}

export default function AdminDashboard({ user, userData }: { user: any; userData: UserData | null; }) {
    const { users, loading } = useUsers();

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
                    <CardHeader>
                        <CardTitle>User Management</CardTitle>
                        <CardDescription>View and manage all users in the system.</CardDescription>
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
                                                    variant={u.status === 'approved' ? 'secondary' : 'destructive'}
                                                    className="capitalize bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                                >
                                                    {u.status.replace('_', ' ')}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm">Manage</Button>
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
