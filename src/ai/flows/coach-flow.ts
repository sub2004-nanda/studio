
'use server';

/**
 * @fileOverview A personal AI coach for providing guidance.
 *
 * - askCoach - A function that handles the coaching conversation.
 * - CoachInput - The input type for the askCoach function.
 * - CoachOutput - The return type for the askCoach function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CoachInputSchema = z.string();
export type CoachInput = z.infer<typeof CoachInputSchema>;

const CoachOutputSchema = z.string();
export type CoachOutput = z.infer<typeof CoachOutputSchema>;


export async function askCoach(input: CoachInput): Promise<CoachOutput> {
    return coachFlow(input);
}

const coachFlow = ai.defineFlow(
    {
        name: 'coachFlow',
        inputSchema: CoachInputSchema,
        outputSchema: CoachOutputSchema,
    },
    async (prompt) => {
        const llmResponse = await ai.generate({
            prompt: `You are an expert Personal AI Guide for an employee productivity platform. Your goal is to provide concise, actionable, and encouraging advice. A user is asking for help.

            User's question: "${prompt}"

            Your response should be helpful and directly address their question.`,
            model: 'googleai/gemini-2.5-flash',
            config: {
                temperature: 0.7,
            },
        });

        return llmResponse.text;
    }
);
