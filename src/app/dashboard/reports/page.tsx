
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Mail, Calendar as CalendarIcon, FileText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ReportsPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Automated Reports & AI Insights</h1>
                <p className="text-muted-foreground">Generate, schedule, and export performance reports with AI-powered summaries.</p>
            </div>

             <Card>
                <CardHeader>
                    <CardTitle>Generate a New Report</CardTitle>
                    <CardDescription>Select filters to create a custom report.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-3">
                     <div className="space-y-2">
                        <label className="text-sm font-medium">Report Type</label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a report type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="department">Department Summary</SelectItem>
                                <SelectItem value="employee">Employee KPI Breakdown</SelectItem>
                                <SelectItem value="goal">Goal Completion Analysis</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium">Date Range</label>
                        <Popover>
                            <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium">Department</label>
                         <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="All Departments" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Departments</SelectItem>
                                <SelectItem value="engineering">Engineering</SelectItem>
                                <SelectItem value="marketing">Marketing</SelectItem>
                                <SelectItem value="sales">Sales</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                     <Button>
                        <FileText className="mr-2 h-4 w-4" />
                        Generate Report
                    </Button>
                </CardFooter>
            </Card>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Generated Report Preview</CardTitle>
                    <CardDescription>This is a preview of your generated report. You can export it below.</CardDescription>
                </CardHeader>
                 <CardContent>
                   <div className="p-6 border rounded-lg bg-muted/20">
                     <h3 className="font-bold text-lg">AI-Powered Summary</h3>
                     <p className="text-muted-foreground mt-2 text-sm">
                        For the selected period, the Engineering department showed a 12% increase in productivity, successfully meeting 95% of its goals. However, project "Phoenix" is running 5 days behind schedule. It's recommended to re-allocate resources to mitigate delays.
                     </p>
                     <div className="mt-4 h-64 bg-muted rounded-md flex items-center justify-center">
                         <p className="text-muted-foreground">Chart placeholder</p>
                     </div>
                   </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline"><Mail className="mr-2 h-4 w-4" /> Email Report</Button>
                    <Button><Download className="mr-2 h-4 w-4" /> Export to PDF</Button>
                </CardFooter>
            </Card>
        </>
    )
}
