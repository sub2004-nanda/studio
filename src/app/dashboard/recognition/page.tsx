
"use client";

import { Award, Gift, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

type Recognition = {
    id: number;
    from: string;
    to: string;
    message: string;
    timestamp: string;
};

const initialRecognitions: Recognition[] = [
    { id: 1, from: 'Alice', to: 'Bob', message: 'Thanks for helping me with that complex bug, you are a lifesaver!', timestamp: '2 hours ago' },
    { id: 2, from: 'Charlie', to: 'Alice', message: 'Amazing presentation today! The client was really impressed.', timestamp: '1 day ago' },
    { id: 3, from: 'Bob', to: 'David', message: 'Great job on the project proposal. Your hard work really paid off.', timestamp: '3 days ago' },
];

// As per your request, using a predefined list of colleagues
const colleagues = [
    { uid: 'user-ankit', name: 'Ankit' },
    { uid: 'user-subrat', name: 'Subrat' },
    { uid: 'user-anjan', name: 'Anjan' },
    { uid: 'user-omnshu', name: 'Omnshu' },
    { uid: 'user-deepika', name: 'Deepika' },
];


function getInitials(name: string) {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}


export default function RecognitionPage() {
    const { userData } = useAuth();
    const { toast } = useToast();
    const [recognitions, setRecognitions] = useState<Recognition[]>(initialRecognitions);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendKudos = () => {
        if (!selectedUser || !message.trim()) {
            toast({
                title: "Incomplete Submission",
                description: "Please select a colleague and write a message.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        const toUser = colleagues.find(u => u.uid === selectedUser);

        const newRecognition: Recognition = {
            id: recognitions.length + 1,
            from: userData?.name || 'Anonymous',
            to: toUser?.name || 'Selected User',
            message: message,
            timestamp: 'Just now',
        };

        // In a real app, this would be a Firestore write.
        // For now, we simulate it with local state.
        setTimeout(() => {
             setRecognitions([newRecognition, ...recognitions]);
             setMessage('');
             setSelectedUser(null); // This will reset the select trigger text
             toast({
                title: "Kudos Sent!",
                description: `Your recognition for ${toUser?.name} has been posted.`,
            });
            setIsLoading(false);
        }, 500);
    };

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
                             <Select onValueChange={setSelectedUser} value={selectedUser || ''}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a colleague..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {colleagues.map(user => (
                                        <SelectItem key={user.uid} value={user.uid}>
                                            {user.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Textarea 
                                placeholder="Write a message of appreciation..." 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <Button className="w-full" onClick={handleSendKudos} disabled={isLoading}>
                                <Send className="mr-2 h-4 w-4" />
                                {isLoading ? 'Sending...' : 'Send Kudos'}
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
