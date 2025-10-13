
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bot, Send, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

type Message = {
    sender: 'user' | 'ai';
    text: string;
};

export default function CoachPage() {
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'ai', text: "Hello! I'm your Personal AI Guide. How can I help you improve your skills or workflow today?" }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            const userMessage: Message = { sender: 'user', text: input };
            // Placeholder for AI response
            const aiResponse: Message = { sender: 'ai', text: "That's a great question. Let's break it down..." };
            setMessages([...messages, userMessage, aiResponse]);
            setInput('');
        }
    };

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Your Personal AI Guide</h1>
                <p className="text-muted-foreground">Ask questions, get advice on KPIs, and plan your work for maximum impact.</p>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Chat with Your Personal AI Guide</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[500px] w-full pr-4 mb-4">
                        <div className="space-y-6">
                            {messages.map((message, index) => (
                                <div key={index} className={`flex items-start gap-4 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                                    {message.sender === 'ai' && (
                                        <div className="p-2 bg-primary/10 rounded-full">
                                            <Bot className="h-6 w-6 text-primary" />
                                        </div>
                                    )}
                                    <div className={`rounded-lg px-4 py-3 max-w-[75%] ${message.sender === 'ai' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                                        <p className="text-sm">{message.text}</p>
                                    </div>
                                    {message.sender === 'user' && (
                                        <div className="p-2 bg-muted rounded-full">
                                            <User className="h-6 w-6" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                    <div className="flex gap-2">
                        <Textarea 
                            placeholder="Ask for advice, e.g., 'How can I improve my response time KPI?'" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
                        />
                        <Button onClick={handleSend}><Send className="h-4 w-4" /></Button>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
