
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Lightbulb, PlayCircle } from "lucide-react";

const courses = [
    {
        title: "Advanced React Patterns",
        description: "Linked to 'Master New Frontend Framework' goal. Deepen your understanding of React.",
        category: "Technical Skills",
        progress: 60,
    },
    {
        title: "Effective Communication",
        description: "Improve your interaction with team members and clients.",
        category: "Soft Skills",
        progress: 25,
    },
    {
        title: "Time Management Fundamentals",
        description: "AI-suggested based on your workload patterns to help you optimize your day.",
        category: "Productivity",
        progress: 0,
        isSuggested: true,
    }
];

export default function LearningPage() {
    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">My Learning & Skill Development</h1>
                <p className="text-muted-foreground">Track your assigned courses and discover new learning opportunities.</p>
            </div>
            <div className="grid gap-6">
                {courses.map((course, index) => (
                    <Card key={index} className={course.isSuggested ? "bg-amber-50 border-amber-200" : ""}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="flex items-center gap-2 mb-1">
                                        <BookOpen className="h-5 w-5" />
                                        {course.title}
                                    </CardTitle>
                                    <CardDescription>{course.description}</CardDescription>
                                </div>
                                <PlayCircle className="h-10 w-10 text-primary cursor-pointer hover:scale-110 transition-transform" />
                            </div>
                        </CardHeader>
                        <CardContent>
                             {course.isSuggested && (
                                <div className="flex items-center gap-2 text-amber-800 text-sm mb-4">
                                    <Lightbulb className="h-4 w-4"/>
                                    <p>Suggested for you by AI</p>
                                </div>
                            )}
                            <div className="flex justify-between items-center mb-1">
                                <p className="text-sm font-medium">{course.progress > 0 ? `${course.progress}% complete` : "Not started"}</p>
                                <p className="text-sm font-bold text-muted-foreground">{course.category}</p>
                            </div>
                            <Progress value={course.progress} />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
}
