// src/ai/flows/generate-study-plan.ts
'use server';

/**
 * @fileOverview AI-powered study plan generator.
 *
 * - generateStudyPlan - A function that generates a personalized study plan.
 * - GenerateStudyPlanInput - The input type for the generateStudyPlan function.
 * - GenerateStudyPlanOutput - The return type for the generateStudyPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStudyPlanInputSchema = z.object({
  subjects: z
    .string()
    .describe('The subjects to be included in the study plan, separated by commas.'),
  availableTime: z
    .string()
    .describe('The amount of time available for studying, e.g., 2 hours per day.'),
  examDates: z.string().describe('The dates of the exams for each subject, separated by commas.'),
});
export type GenerateStudyPlanInput = z.infer<typeof GenerateStudyPlanInputSchema>;

const GenerateStudyPlanOutputSchema = z.object({
  studyPlan: z.string().describe('A personalized study plan.'),
});
export type GenerateStudyPlanOutput = z.infer<typeof GenerateStudyPlanOutputSchema>;

export async function generateStudyPlan(input: GenerateStudyPlanInput): Promise<GenerateStudyPlanOutput> {
  return generateStudyPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStudyPlanPrompt',
  input: {schema: GenerateStudyPlanInputSchema},
  output: {schema: GenerateStudyPlanOutputSchema},
  prompt: `You are an expert study plan generator. Create a personalized study plan based on the following information:

Subjects: {{{subjects}}}
Available Time: {{{availableTime}}}
Exam Dates: {{{examDates}}}

The study plan should be detailed and optimized for effective learning.`,
});

const generateStudyPlanFlow = ai.defineFlow(
  {
    name: 'generateStudyPlanFlow',
    inputSchema: GenerateStudyPlanInputSchema,
    outputSchema: GenerateStudyPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
