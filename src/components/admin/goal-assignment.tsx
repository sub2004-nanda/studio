
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from "date-fns"
import { Calendar as CalendarIcon, Target } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from '../ui/checkbox';

const kpis = [
    { id: '1', name: 'File Disposal Rate' },
    { id: '2', name: 'Customer Satisfaction' },
    { id: '3', name: 'Code Quality Score' },
];

const formSchema = z.object({
  assignTo: z.enum(['individual', 'department', 'organization']),
  title: z.string().min(3, { message: 'Goal title must be at least 3 characters.' }),
  description: z.string().optional(),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  priority: z.enum(['High', 'Medium', 'Low']),
  linkedKpis: z.array(z.string()).optional(),
});

export default function GoalAssignment() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assignTo: 'individual',
      title: '',
      description: '',
      priority: 'Medium',
      linkedKpis: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log('Assigning goal:', values);

    // Placeholder for Firestore logic
    setTimeout(() => {
        toast({
            title: 'Goal Assigned',
            description: `"${values.title}" has been successfully assigned.`,
        });
        form.reset();
        setIsLoading(false);
    }, 1000)
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Assign New Goal
            </CardTitle>
            <CardDescription>
                Define a new goal and assign it to an individual, department, or the whole organization.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Goal Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Increase Q4 Sales by 15%" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="assignTo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Assign To</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select who to assign this goal to" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="individual">Individual Employee</SelectItem>
                                            <SelectItem value="department">Department</SelectItem>
                                            <SelectItem value="organization">Entire Organization</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Describe the goal in detail, including the objectives and expected outcomes."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="dateRange"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Start & End Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value?.from ? (
                                                field.value.to ? (
                                                <>
                                                    {format(field.value.from, "LLL dd, y")} -{" "}
                                                    {format(field.value.to, "LLL dd, y")}
                                                </>
                                                ) : (
                                                format(field.value.from, "LLL dd, y")
                                                )
                                            ) : (
                                                <span>Pick a date range</span>
                                            )}
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            initialFocus
                                            mode="range"
                                            defaultMonth={field.value?.from}
                                            selected={{ from: field.value?.from, to: field.value?.to }}
                                            onSelect={field.onChange}
                                            numberOfMonths={2}
                                        />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Priority</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Set the priority level" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="High">High</SelectItem>
                                            <SelectItem value="Medium">Medium</SelectItem>
                                            <SelectItem value="Low">Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <FormField
                        control={form.control}
                        name="linkedKpis"
                        render={({ field }) => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">Link to KPIs</FormLabel>
                                    <FormDescription>
                                        Connect this goal to one or more Key Performance Indicators.
                                    </FormDescription>
                                </div>
                                {kpis.map((kpi) => (
                                <FormField
                                    key={kpi.id}
                                    control={form.control}
                                    name="linkedKpis"
                                    render={({ field }) => {
                                    return (
                                        <FormItem
                                        key={kpi.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                        <FormControl>
                                            <Checkbox
                                            checked={field.value?.includes(kpi.id)}
                                            onCheckedChange={(checked) => {
                                                return checked
                                                ? field.onChange([...(field.value || []), kpi.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                        (value) => value !== kpi.id
                                                    )
                                                    )
                                            }}
                                            />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {kpi.name}
                                        </FormLabel>
                                        </FormItem>
                                    )
                                    }}
                                />
                                ))}
                                <FormMessage />
                            </FormItem>
                        )}
                        />

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Assign Goal
                        </Button>
                    </div>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}
