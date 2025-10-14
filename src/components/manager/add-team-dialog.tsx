
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { UserData } from '@/hooks/use-auth';
import { Checkbox } from '../ui/checkbox';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Team name must be at least 3 characters.' }),
  project: z.string().min(3, { message: 'Project name is required.'}),
  memberUids: z.array(z.string()).refine(value => value.some(item => item), {
    message: "You have to select at least one team member.",
  }),
});

interface AddTeamDialogProps {
    children: React.ReactNode;
    members: UserData[];
}

export function AddTeamDialog({ children, members }: AddTeamDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      project: '',
      memberUids: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // In a real app, this would write to Firestore
    console.log('Creating team:', values);
    
    setTimeout(() => {
        toast({
            title: 'Team Created',
            description: `The team "${values.name}" has been successfully created.`,
        });
        setIsLoading(false);
        form.reset();
        setIsOpen(false);
    }, 1000);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
          <DialogDescription>
            Assemble a team from your department roster for a specific project.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Frontend Wizards" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="project"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Associated Project</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Website Revamp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="memberUids"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Select Team Members</FormLabel>
                    <FormDescription>
                      Choose who will be on this team.
                    </FormDescription>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {members.map((item) => (
                      <FormField
                        key={item.uid}
                        control={form.control}
                        name="memberUids"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.uid}
                              className="flex flex-row items-center space-x-3 space-y-0 p-2 rounded-md hover:bg-muted"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.uid)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item.uid])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.uid
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal w-full cursor-pointer">
                                {item.name}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />


            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Team
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
