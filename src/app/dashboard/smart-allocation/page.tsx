
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Bot, Loader2, User, Sparkles, Wand2, Star } from 'lucide-react';
import { useManagerData, useTeamTasks } from '@/hooks/use-manager-data';
import { useAuth } from '@/hooks/use-auth';
import { recommendAssignee, type SmartAllocationOutput } from '@/ai/flows/smart-allocation-flow';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

function getInitials(name: string) {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}


const formSchema = z.object({
  taskDescription: z.string().min(10, {
    message: 'Please provide a detailed task description of at least 10 characters.',
  }),
});

export default function SmartAllocationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<SmartAllocationOutput | null>(null);
  const { userData } = useAuth();
  const { teamMembers, loading: membersLoading } = useManagerData(userData);
  const { tasks, loading: tasksLoading } = useTeamTasks(teamMembers);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskDescription: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendation(null);
    
    const employeeData = teamMembers.map(member => {
        const memberTasks = tasks.filter(t => t.assignee === member.name);
        return {
            name: member.name,
            skills: ['React', 'Node.js', 'UI/UX'], // Mock skills
            currentWorkload: memberTasks.length,
            performanceScore: Math.round(((member.name.length * 10) % 30 + 70)), // Mock score
        }
    });

    try {
      const result = await recommendAssignee({
        taskDescription: values.taskDescription,
        employees: employeeData,
      });
      setRecommendation(result);
    } catch (error) {
      console.error('Error getting AI recommendation:', error);
      toast({
        title: 'Error',
        description: 'Could not get an AI recommendation. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const recommendedEmployeeDetails = recommendation ? teamMembers.find(m => m.name === recommendation.recommendedAssignee) : null;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Wand2 className="h-7 w-7 text-primary" />
          AI-Powered Smart Task Allocation
        </h1>
        <p className="text-muted-foreground">
          Describe a task, and let the AI recommend the best team member to handle it based on skills, current workload, and performance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Describe the Task</CardTitle>
            <CardDescription>
              Provide a clear and detailed description of the task you need to assign. The more detail, the better the recommendation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="taskDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'Develop a new user profile page with a settings tab. It needs to be responsive and integrate with the new avatar upload API. This is a high-priority feature for the Q3 roadmap.'"
                          className="resize-y min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading || membersLoading || tasksLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Get AI Recommendation
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isLoading && (
            <Card className="flex flex-col items-center justify-center p-8 h-full min-h-[300px]">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground">AI is thinking...</h3>
                <p className="text-sm text-muted-foreground text-center">Analyzing team skills and workload to find the perfect match.</p>
            </Card>
        )}

        {recommendation && recommendedEmployeeDetails && (
            <Card className="border-2 border-primary bg-primary/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                         <Star className="h-6 w-6 text-yellow-500 fill-yellow-400" />
                        AI Recommendation: Assign to {recommendation.recommendedAssignee}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={`https://avatar.vercel.sh/${recommendedEmployeeDetails.email}.png`} alt={recommendedEmployeeDetails.name} />
                            <AvatarFallback>{getInitials(recommendedEmployeeDetails.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold text-lg">{recommendedEmployeeDetails.name}</p>
                             <div className="flex gap-2 mt-1">
                                <Badge>Workload: {tasks.filter(t => t.assignee === recommendedEmployeeDetails.name).length} tasks</Badge>
                                <Badge variant="secondary">Score: 88</Badge>
                             </div>
                        </div>
                    </div>
                     <div className="p-4 bg-background/50 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2"><Bot className="h-5 w-5"/> Justification</h4>
                        <p className="text-sm text-muted-foreground italic">"{recommendation.justification}"</p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Choose Someone Else</Button>
                    <Button>Confirm & Assign Task</Button>
                </CardFooter>
            </Card>
        )}
         {!isLoading && !recommendation && (
             <Card className="flex flex-col items-center justify-center p-8 border-dashed h-full min-h-[300px]">
                <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">Waiting for a task...</h3>
                <p className="text-sm text-muted-foreground text-center">Describe a task on the left to get started.</p>
            </Card>
        )}
      </div>
    </>
  );
}
