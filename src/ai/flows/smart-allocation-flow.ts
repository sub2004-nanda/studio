
'use server';

/**
 * @fileOverview An AI flow for recommending the best employee to assign a task to.
 *
 * - recommendAssignee - A function that takes task and employee details and returns a recommendation.
 * - SmartAllocationInput - The input type for the recommendAssignee function.
 * - SmartAllocationOutput - The return type for the recommendAssignee function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const EmployeeSchema = z.object({
  name: z.string().describe('The name of the employee.'),
  skills: z.array(z.string()).describe('A list of the employee\'s technical or soft skills.'),
  currentWorkload: z.number().describe('The number of tasks currently assigned to the employee.'),
  performanceScore: z.number().describe('A score from 0-100 representing the employee\'s recent performance.'),
});

export const SmartAllocationInputSchema = z.object({
  taskDescription: z.string().describe('A detailed description of the task to be assigned.'),
  employees: z.array(EmployeeSchema).describe('A list of available employees to choose from.'),
});
export type SmartAllocationInput = z.infer<typeof SmartAllocationInputSchema>;

export const SmartAllocationOutputSchema = z.object({
  recommendedAssignee: z
    .string()
    .describe('The name of the employee who is the best fit for the task.'),
  justification: z
    .string()
    .describe(
      'A brief, one-sentence explanation for why this employee was recommended, considering their skills, workload, and performance.'
    ),
});
export type SmartAllocationOutput = z.infer<typeof SmartAllocationOutputSchema>;


export async function recommendAssignee(input: SmartAllocationInput): Promise<SmartAllocationOutput> {
  // Ensure we don't send an empty list of employees to the model.
  if (input.employees.length === 0) {
    return {
      recommendedAssignee: "No one",
      justification: "There are no employees available in the department to assign this task to."
    }
  }
  return smartAllocationFlow(input);
}


const smartAllocationFlow = ai.defineFlow(
  {
    name: 'smartAllocationFlow',
    inputSchema: SmartAllocationInputSchema,
    outputSchema: SmartAllocationOutputSchema,
  },
  async (input) => {
    
    const prompt = `You are an expert project manager responsible for assigning tasks. Your goal is to choose the best employee for a new task based on their skills, current workload, and past performance.

    Analyze the following task:
    Task Description: "${input.taskDescription}"

    Here is the list of available team members:
    ${input.employees.map(e => `- ${e.name}: Skills: [${e.skills.join(', ')}], Workload: ${e.currentWorkload} tasks, Performance Score: ${e.performanceScore}/100`).join('\n')}

    Your task:
    1.  Evaluate which employee's skills are the best match for the task description.
    2.  Consider their current workload. Avoid assigning tasks to someone who is already overloaded.
    3.  Factor in their performance score. A higher score indicates reliability.
    4.  Based on your analysis, recommend one employee and provide a concise, one-sentence justification for your choice.
    `;
    
    const llmResponse = await ai.generate({
      prompt: prompt,
      model: 'googleai/gemini-2.5-flash',
      output: {
        schema: SmartAllocationOutputSchema,
      },
      config: {
        temperature: 0.3,
      },
    });

    return llmResponse.output()!;
  }
);
