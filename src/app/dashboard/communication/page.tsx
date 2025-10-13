
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Bell, Megaphone } from "lucide-react";

const announcements = [
    {
        id: 1,
        title: "Company-Wide Town Hall Meeting",
        content: "Join us for the quarterly town hall next Friday at 10 AM PST. We'll be discussing our Q3 results and future roadmap.",
        date: "2023-10-15",
    },
    {
        id: 2,
        title: "New Performance Review Cycle",
        content: "The Q4 performance review cycle has officially begun. Please complete your self-assessment by November 1st.",
        date: "2023-10-10",
    }
]

export default function CommunicationPage() {
    return (
        <>
             <div className="mb-8">
                <h1 className="text-3xl font-bold">Announcements & Notifications</h1>
                <p className="text-muted-foreground">Stay up-to-date with important company news and alerts.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Megaphone className="h-5 w-5" />
                        Company Announcements
                    </CardTitle>
                    <CardDescription>Recent messages broadcasted by the administration.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {announcements.map(item => (
                        <div key={item.id} className="p-4 border rounded-lg bg-muted/30">
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">Posted on: {item.date}</p>
                            <p>{item.content}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </>
    )
}
