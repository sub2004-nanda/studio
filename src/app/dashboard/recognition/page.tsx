
"use client";

import { Award, Gift, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUsers } from "@/hooks/use-users";

const recognitions = [
    { id: 1, from: 'Alice', to: 'Bob', message: 'Thanks for helping me with that complex bug, you are a lifesaver!', timestamp: '2 hours ago' },
    { id: 2, from: 'Charlie', to: 'Alice', message: 'Amazing presentation today! The client was really impressed.', timestamp: '1 day ago' },
    { id: 3, from: 'Bob', to: 'David', message: 'Great job on the project proposal. Your hard work really paid off.', timestamp: '3 days ago' },
];

function getInitials(name: string) {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}


export default function RecognitionPage() {
    // In a real app, users would not include the current user.
    const { users } = useUsers(); 

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Peer Recognition & Kudos</h1>
                <p className="text-muted-foreground">Acknowledge your colleagues for their hard work and positive impact.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Gift className="h-5 w-5" />
                                Send Recognition
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a colleague..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {users.map(user => (
                                        <SelectItem key={user.uid} value={user.uid}>
                                            {user.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Textarea placeholder="Write a message of appreciation..." />
                            <Button className="w-full">
                                <Send className="mr-2 h-4 w-4" />
                                Send Kudos
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Team Recognition Wall</CardTitle>
                            <CardDescription>See the latest kudos sent across the team.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {recognitions.map(rec => (
                                <div key={rec.id} className="flex items-start gap-4">
                                     <Avatar>
                                        <AvatarImage src={`https://avatar.vercel.sh/${rec.from}.png`} alt={rec.from} />
                                        <AvatarFallback>{getInitials(rec.from)}</AvatarFallback>
                                    </Avatar>
                                    <div className="w-full">
                                        <div className="flex items-baseline justify-between">
                                             <p className="font-semibold">{rec.from} <span className="text-muted-foreground font-normal">to</span> {rec.to}</p>
                                             <p className="text-xs text-muted-foreground">{rec.timestamp}</p>
                                        </div>
                                        <div className="mt-2 p-3 bg-muted rounded-lg">
                                            <p className="text-sm">"{rec.message}"</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
