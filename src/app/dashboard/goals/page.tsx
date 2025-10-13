
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Lightbulb } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import GoalAssignment from "@/components/admin/goal-assignment";

const employeeGoals = [
    {
        title: "Achieve 95% Customer Satisfaction Score",
        description: "Maintain a high level of customer satisfaction through excellent service.",
        kpi: "Customer Satisfaction",
        progress: 92,
        target: 95,
    },
    {
        title: "Improve Average Response Time by 10%",
        description: "Decrease the average time it takes to respond to customer support tickets.",
        kpi: "Response Time",
        progress: 85,
        target: 95,
        aiSuggestion: "Your response time on tickets tagged 'urgent' is slightly lower. Prioritizing these could help you reach your target faster."
    },
    {
        title: "Master New Frontend Framework",
        description: "Complete the React advanced course and apply it to a new project.",
        kpi: "Personal Development",
        progress: 60,
        target: 100,
    }
];

function EmployeeGoals() {
    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">My Goals & KPIs</h1>
                <p className="text-muted-foreground">Track your progress against your assigned goals and Key Performance Indicators.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {employeeGoals.map((goal, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="flex items-start gap-2">
                                <Target className="h-5 w-5 mt-1 text-primary" />
                                {goal.title}
                            </CardTitle>
                            <CardDescription>{goal.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                    Linked KPI: <span className="font-bold text-foreground">{goal.kpi}</span>
                                </p>
                                <div className="flex justify-between items-center mb-1">
                                    <p className="text-sm font-medium">Progress</p>
                                    <p className={`text-sm font-bold ${goal.progress >= goal.target ? 'text-green-600' : 'text-yellow-600'}`}>
                                        {goal.progress}% / {goal.target}%
                                    </p>
                                </div>
                                <Progress value={goal.progress} />
                            </div>
                            {goal.aiSuggestion && (
                                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900">
                                    <div className="flex items-start gap-2">
                                        <Lightbulb className="h-4 w-4 mt-0.5" />
                                        <p className="text-xs"><strong>AI Suggestion:</strong> {goal.aiSuggestion}</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default function GoalsPage() {
    const { userData } = useAuth();
    
    // Admins and Managers see the goal assignment interface
    if (userData?.role === 'admin' || userData?.role === 'manager') {
        return <GoalAssignment />;
    }

    // Employees see their own goals
    return <EmployeeGoals />;
}
