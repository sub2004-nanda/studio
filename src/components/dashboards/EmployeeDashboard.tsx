
"use client";

import { UserData } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ListTodo, Trophy, TrendingUp, BookOpen, Bot, Award, BarChart, Users } from "lucide-react";
import { FeatureCard } from "./FeatureCard";
import { useState } from "react";
import { cn } from "@/lib/utils";

const StatCard = ({ title, value, icon: Icon, change }: { title: string, value: string | number, icon: React.ElementType, change?: string }) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {change && <p className="text-xs text-muted-foreground">{change}</p>}
            </CardContent>
        </Card>
    );
};

export default function EmployeeDashboard({ user, userData }: { user: any; userData: UserData | null }) {
    const [pulse, setPulse] = useState<string | null>(null);

    const handlePulse = (mood: string) => {
        if (!pulse) {
            setPulse(mood);
        }
    }
    
    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">My Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {userData?.name}. Here's your productivity overview.</p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <StatCard title="Tasks Completed (Month)" value="30" icon={CheckCircle} change="+5 from last week" />
                <StatCard title="Pending Tasks" value="8" icon={ListTodo} />
                <StatCard title="Overall Performance Score" value="91%" icon={TrendingUp} change="+2% from last month" />
                <StatCard title="Achievements Unlocked" value="5" icon={Trophy} change="New 'Deadline Hero' badge!" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <FeatureCard 
                    title="My Tasks"
                    description="View, update, and submit your assigned tasks."
                    icon={ListTodo}
                    href="/dashboard/tasks"
                />
                 <FeatureCard 
                    title="My Goals"
                    description="Track your personal goals and KPI progress."
                    icon={Trophy}
                    href="/dashboard/goals"
                />
                 <FeatureCard 
                    title="My Performance"
                    description="Visualize your performance trends over time."
                    icon={BarChart}
                    href="/dashboard/performance"
                />
                 <FeatureCard 
                    title="My Learning"
                    description="Access courses and track your skill development."
                    icon={BookOpen}
                    href="/dashboard/learning"
                />
                 <FeatureCard 
                    title="Personal AI Guide"
                    description="Get personalized advice and motivational prompts."
                    icon={Bot}
                    href="/dashboard/coach"
                />
                 <FeatureCard 
                    title="Peer Recognition"
                    description="Acknowledge your colleagues and view team kudos."
                    icon={Award}
                    href="/dashboard/recognition"
                />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                 <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Team Pulse</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {pulse ? (
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground mb-4">Thank you for your feedback!</p>
                                <p className="text-4xl">{pulse}</p>
                            </div>
                        ) : (
                            <>
                                <p className="text-sm text-muted-foreground mb-4">How are you feeling about your work this week?</p>
                                <div className="flex justify-around">
                                    <button onClick={() => handlePulse('😞')} className={cn("text-3xl transition-transform", pulse ? "cursor-not-allowed" : "hover:scale-125", pulse === '😞' && "scale-125")}>😞</button>
                                    <button onClick={() => handlePulse('😐')} className={cn("text-3xl transition-transform", pulse ? "cursor-not-allowed" : "hover:scale-125", pulse === '😐' && "scale-125")}>😐</button>
                                    <button onClick={() => handlePulse('🙂')} className={cn("text-3xl transition-transform", pulse ? "cursor-not-allowed" : "hover:scale-125", pulse === '🙂' && "scale-125")}>🙂</button>
                                    <button onClick={() => handlePulse('😁')} className={cn("text-3xl transition-transform", pulse ? "cursor-not-allowed" : "hover:scale-125", pulse === '😁' && "scale-125")}>😁</button>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Weekly Workload Forecast</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <Bot className="h-8 w-8 text-primary" />
                            <div>
                                <p className="font-medium">Your upcoming week looks manageable.</p>
                                <p className="text-sm text-muted-foreground">AI predicts you have a 75% chance to complete all scheduled tasks on time. Friday appears to be your busiest day.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
