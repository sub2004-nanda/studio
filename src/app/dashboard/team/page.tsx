
"use client";

import { useManagerData } from "@/hooks/use-manager-data";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, Users, UserPlus, MoreVertical, FolderKanban } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AddTeamDialog } from "@/components/manager/add-team-dialog";

function getInitials(name: string) {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}


// Mock data for teams since it's not in firestore yet.
const mockTeams = [
    {
        id: 'team1',
        name: 'Project Phoenix - Frontend',
        project: 'Website Revamp',
        members: ['Ankit', 'Deepika'],
    },
    {
        id: 'team2',
        name: 'Project Phoenix - Backend',
        project: 'Website Revamp',
        members: ['Subrat', 'Omnshu'],
    },
     {
        id: 'team3',
        name: 'Q4 Marketing Content',
        project: 'Marketing Campaign',
        members: ['Anjan'],
    }
];

function TeamManagementContent() {
    const { userData } = useAuth();
    const { teamMembers, loading } = useManagerData(userData);
    
    if (loading) {
        return (
             <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    const unassignedMembers = teamMembers.filter(member => 
        !mockTeams.flatMap(t => t.members).includes(member.name)
    );

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Team Management</h1>
                    <p className="text-muted-foreground">Organize your department into project-specific teams.</p>
                </div>
                 <AddTeamDialog members={teamMembers}>
                    <Button>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Create Team
                    </Button>
                </AddTeamDialog>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-semibold">Active Teams</h2>
                    {mockTeams.map(team => (
                        <Card key={team.id}>
                             <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>{team.name}</CardTitle>
                                        <CardDescription className="flex items-center gap-2 mt-1">
                                            <FolderKanban className="h-4 w-4" />
                                            {team.project}
                                        </CardDescription>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit Team</DropdownMenuItem>
                                            <DropdownMenuItem>Assign Tasks</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">Disband Team</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <h4 className="text-sm font-medium mb-3 text-muted-foreground">Members ({team.members.length})</h4>
                                <div className="flex flex-wrap gap-4">
                                     {team.members.map(memberName => {
                                        const member = teamMembers.find(m => m.name === memberName);
                                        if (!member) return null;
                                        return (
                                            <div key={member.uid} className="flex items-center gap-2">
                                                 <Avatar className="h-9 w-9">
                                                    <AvatarImage src={`https://avatar.vercel.sh/${member.email}.png`} alt={member.name} />
                                                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                                                </Avatar>
                                                <p className="text-sm font-medium">{member.name}</p>
                                            </div>
                                        )
                                     })}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                     {!mockTeams.length && (
                        <Card className="flex flex-col items-center justify-center p-8 border-dashed">
                            <Users className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold">No Teams Created Yet</h3>
                            <p className="text-muted-foreground text-sm">Use the 'Create Team' button to get started.</p>
                        </Card>
                    )}
                </div>
                 <div className="lg:col-span-1">
                    <h2 className="text-2xl font-semibold mb-6">Department Roster ({teamMembers.length})</h2>
                     <Card>
                        <CardContent className="p-4 space-y-4">
                            {teamMembers.map(member => (
                                <div key={member.uid} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={`https://avatar.vercel.sh/${member.email}.png`} alt={member.name} />
                                            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-sm">{member.name}</p>
                                            <p className="text-xs text-muted-foreground">{member.email}</p>
                                        </div>
                                    </div>
                                    {!unassignedMembers.find(m => m.uid === member.uid) ? (
                                        <Badge variant="secondary">Assigned</Badge>
                                    ) : (
                                        <Badge variant="outline">Unassigned</Badge>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default function TeamPage() {
    const { userData, status } = useAuth();
    
    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (userData?.role === 'manager') {
        return <TeamManagementContent />;
    }
    
    // Fallback for non-managers
    return (
        <Card>
            <CardHeader>
                <CardTitle>Access Denied</CardTitle>
                <CardDescription>You do not have permission to view this page.</CardDescription>
            </CardHeader>
        </Card>
    );
}
