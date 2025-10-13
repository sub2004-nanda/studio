
"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const productivityData = [
  { name: 'Alice', score: 95, status: 'On Task' },
  { name: 'Bob', score: 82, status: 'On Task' },
  { name: 'Charlie', score: 65, status: 'Needs Support' },
  { name: 'David', score: 98, status: 'Excelling' },
  { name: 'Eve', score: 75, status: 'On Task' },
  { name: 'Frank', score: 45, status: 'Idle' },
  { name: 'Grace', score: 88, status: 'On Task' },
  { name: 'Heidi', score: 91, status: 'On Task' },
  { name: 'Ivan', score: 78, status: 'On Task' },
  { name: 'Judy', score: 55, status: 'Needs Support' },
  { name: 'Mallory', score: 100, status: 'Excelling' },
  { name: 'Niaj', score: 20, status: 'Idle' },
];

const getProductivityColor = (score: number) => {
  if (score >= 95) return 'bg-emerald-500'; // Excelling
  if (score >= 80) return 'bg-emerald-400';
  if (score >= 70) return 'bg-yellow-400'; // On Track
  if (score >= 50) return 'bg-amber-500'; // Needs Support
  return 'bg-red-500'; // Idle / At Risk
};

export default function ProductivityHeatmap() {
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
