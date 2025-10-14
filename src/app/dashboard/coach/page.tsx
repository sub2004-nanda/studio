
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bot, Send, User, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { askCoach } from "@/ai/flows/coach-flow";

type Message = {
    sender: 'user' | 'ai';
    text: string;
};

export default function CoachPage() {
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'ai', text: "Hello! I'm your Personal AI Guide. How can I help you improve your skills or workflow today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (input.trim() && !isLoading) {
            const userMessage: Message = { sender: 'user', text: input };
            const aiThinkingMessage: Message = { sender: 'ai', text: "Thinking..." };
            
            setMessages(prev => [...prev, userMessage, aiThinkingMessage]);
            setInput('');
            setIsLoading(true);

            try {
                const aiResponseText = await askCoach(input);
                const aiResponseMessage: Message = { sender: 'ai', text: aiResponseText };
                
                // Replace "Thinking..." with the actual response
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = aiResponseMessage;
                    return newMessages;
                });

            } catch (error) {
                console.error("Error fetching AI response:", error);
                const errorMessage: Message = { sender: 'ai', text: "Sorry, I'm having trouble connecting. Please try again later." };
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = errorMessage;
                    return newMessages;
                });
            } finally {
                setIsLoading(false);
            }
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
                                        {isLoading && message.text === "Thinking..." && index === messages.length - 1 ? (
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                <p className="text-sm text-muted-foreground">Thinking...</p>
                                            </div>
                                        ) : (
                                            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                                        )}
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
                            disabled={isLoading}
                        />
                        <Button onClick={handleSend} disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
