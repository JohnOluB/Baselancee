'use server';

/**
 * @fileOverview An AI agent that analyzes job descriptions to identify required skills, estimate time commitment,
 * and suggest a suitable rate for freelancers.
 *
 * - analyzeJobDescription - A function that handles the job description analysis process.
 * - AnalyzeJobDescriptionInput - The input type for the analyzeJobDescription function.
 * - AnalyzeJobDescriptionOutput - The return type for the analyzeJobDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeJobDescriptionInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The full text of the job description to be analyzed.'),
});

export type AnalyzeJobDescriptionInput = z.infer<
  typeof AnalyzeJobDescriptionInputSchema
>;

const AnalyzeJobDescriptionOutputSchema = z.object({
  requiredSkills: z
    .array(z.string())
    .describe('An array of the skills required for the job.'),
  estimatedTimeCommitment: z
    .string()
    .describe(
      'An estimate of the time commitment required for the job (e.g., "20-30 hours per week", "Full-time", "Part-time").'
    ),
  suggestedRate: z
    .string()
    .describe(
      'A suggested hourly or project rate for the job, including currency (e.g., "$50/hour", "$1000/project").'
    ),
  suitabilityScore: z
    .number()
    .describe(
      'A numerical score (0-100) indicating how well the job matches the freelancer’s skills and experience.'
    ),
});

export type AnalyzeJobDescriptionOutput = z.infer<
  typeof AnalyzeJobDescriptionOutputSchema
>;

export async function analyzeJobDescription(
  input: AnalyzeJobDescriptionInput
): Promise<AnalyzeJobDescriptionOutput> {
  return analyzeJobDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeJobDescriptionPrompt',
  input: {schema: AnalyzeJobDescriptionInputSchema},
  output: {schema: AnalyzeJobDescriptionOutputSchema},
  prompt: `You are an AI assistant that analyzes job descriptions for freelancers.

  Given the job description below, identify the required skills, estimate the time commitment,
  suggest a suitable rate, and provide a suitability score for the freelancer.

  Job Description: {{{jobDescription}}}

  Respond in a valid JSON format that matches the following schema:
  ${JSON.stringify(AnalyzeJobDescriptionOutputSchema.describe(''))}
`,
});

const analyzeJobDescriptionFlow = ai.defineFlow(
  {
    name: 'analyzeJobDescriptionFlow',
    inputSchema: AnalyzeJobDescriptionInputSchema,
    outputSchema: AnalyzeJobDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
