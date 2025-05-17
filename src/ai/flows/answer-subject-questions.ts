// src/ai/flows/answer-subject-questions.ts
'use server';

/**
 * @fileOverview An AI agent that answers subject-specific questions for students.
 *
 * - answerSubjectQuestion - A function that handles answering subject-specific questions.
 * - AnswerSubjectQuestionInput - The input type for the answerSubjectQuestion function.
 * - AnswerSubjectQuestionOutput - The return type for the answerSubjectQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerSubjectQuestionInputSchema = z.object({
  subject: z.string().describe('The subject of the question.'),
  question: z.string().describe('The question to be answered.'),
});
export type AnswerSubjectQuestionInput = z.infer<
  typeof AnswerSubjectQuestionInputSchema
>;

const AnswerSubjectQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});
export type AnswerSubjectQuestionOutput = z.infer<
  typeof AnswerSubjectQuestionOutputSchema
>;

export async function answerSubjectQuestion(
  input: AnswerSubjectQuestionInput
): Promise<AnswerSubjectQuestionOutput> {
  return answerSubjectQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerSubjectQuestionPrompt',
  input: {schema: AnswerSubjectQuestionInputSchema},
  output: {schema: AnswerSubjectQuestionOutputSchema},
  prompt: `You are an AI assistant specialized in answering questions related to various subjects.

  Subject: {{{subject}}}
  Question: {{{question}}}

  Please provide a concise and accurate answer to the question.`,
});

const answerSubjectQuestionFlow = ai.defineFlow(
  {
    name: 'answerSubjectQuestionFlow',
    inputSchema: AnswerSubjectQuestionInputSchema,
    outputSchema: AnswerSubjectQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
