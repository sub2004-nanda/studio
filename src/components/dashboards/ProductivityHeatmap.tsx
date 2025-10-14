
"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { UserData } from "@/hooks/use-auth";
import { useMemo } from "react";

const getProductivityColor = (score: number) => {
  if (score >= 95) return 'bg-emerald-500'; // Excelling
  if (score >= 80) return 'bg-emerald-400';
  if (score >= 70) return 'bg-yellow-400'; // On Track
  if (score >= 50) return 'bg-amber-500'; // Needs Support
  return 'bg-red-500'; // Idle / At Risk
};

type Task = {
    id: number;
    title: string;
    project: string;
    priority: "High" | "Medium" | "Low";
    due: string;
    status: "Pending" | "In Progress" | "Submitted" | "Completed" | "Overdue";
    assignee?: string;
}

interface ProductivityHeatmapProps {
    teamMembers: UserData[];
    tasks: Task[];
}


export default function ProductivityHeatmap({ teamMembers, tasks }: ProductivityHeatmapProps) {

    const productivityData = useMemo(() => {
        return teamMembers.map(member => {
            const memberTasks = tasks.filter(t => t.assignee === member.name);
            const completedTasks = memberTasks.filter(t => t.status === 'Completed').length;
            const score = memberTasks.length > 0 ? Math.round((completedTasks / memberTasks.length) * 100) : 75; // Default score if no tasks
            
            let status = 'On Task';
            if (score >= 95) status = 'Excelling';
            else if (score < 70 && score >= 50) status = 'Needs Support';
            else if (score < 50) status = 'Idle';

            return {
                name: member.name,
                score,
                status
            }
        });
    }, [teamMembers, tasks]);

  return (
    <div>
        <TooltipProvider>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
            {productivityData.map((employee) => (
                <Tooltip key={employee.name}>
                <TooltipTrigger asChild>
                    <div className="flex flex-col items-center gap-2 cursor-pointer">
                        <div
                            className={`w-12 h-12 rounded-lg ${getProductivityColor(employee.score)} transition-all hover:scale-110`}
                        />
                        <p className="text-xs text-muted-foreground truncate w-12 text-center">{employee.name}</p>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="font-semibold">{employee.name}</p>
                    <p>Score: {employee.score}</p>
                    <p>Status: {employee.status}</p>
                </TooltipContent>
                </Tooltip>
            ))}
            </div>
        </TooltipProvider>
        <div className="mt-6 flex justify-end items-center gap-4 text-sm">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><span>Idle / At Risk</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500"></div><span>Needs Support</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-400"></div><span>On Track</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div><span>Excelling</span></div>
        </div>
    </div>
  );
}
