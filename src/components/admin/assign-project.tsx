
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FolderKanban } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { UserData } from '@/hooks/use-auth';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, SecurityRuleContext } from '@/firebase/errors';
import { useUsers } from '@/hooks/use-users';

const formSchema = z.object({
  managerUid: z.string({ required_error: 'Please select a manager.' }),
  projectName: z.string().min(3, { message: 'Project name must be at least 3 characters.' }),
  projectDescription: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
});

function AssignProjectContent({ managers }: { managers: UserData[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const db = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      managerUid: '',
      projectName: '',
      projectDescription: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    if (!db) {
      toast({
        title: "Error",
        description: "Firestore is not available.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const projectData = {
      ...values,
      status: 'not_started',
      createdAt: new Date(),
    };

    const projectsCollectionRef = collection(db, 'projects');

    addDoc(projectsCollectionRef, projectData)
        .then(() => {
            toast({
                title: 'Project Assigned',
                description: `"${values.projectName}" has been assigned.`,
            });
            form.reset();
        })
        .catch(async (serverError) => {
            const permissionError = new FirestorePermissionError({
                path: projectsCollectionRef.path,
                operation: 'create',
                requestResourceData: projectData,
            } satisfies SecurityRuleContext);
            errorEmitter.emit('permission-error', permissionError);
            toast({
                title: "Permission Denied",
                description: "You don't have permission to assign projects.",
                variant: "destructive",
            });
        })
        .finally(() => {
            setIsLoading(false);
        });
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <FolderKanban className="h-5 w-5" />
                Assign New Project
            </CardTitle>
            <CardDescription>
                Assign a new project or task to a department head or manager.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                    control={form.control}
                    name="managerUid"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Assign to Manager</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a manager..." />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {managers.map(manager => (
                                <SelectItem key={manager.uid} value={manager.uid}>
                                {manager.name} ({manager.email})
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Q4 Marketing Campaign" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="projectDescription"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Project Description</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Describe the project goals, deliverables, and timeline."
                            className="resize-none"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className="flex justify-end">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Assign Project
                        </Button>
                    </div>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}


export default function AssignProject() {
    const { users, loading } = useUsers();
    
    if (loading) {
        return (
            <Card className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </Card>
        )
    }

    const managers = users.filter(u => u.role === 'manager');

    return <AssignProjectContent managers={managers} />
}
