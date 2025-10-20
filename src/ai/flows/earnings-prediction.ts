// src/ai/flows/earnings-prediction.ts
'use server';
/**
 * @fileOverview A flow to predict potential earnings for freelancers on the platform.
 *
 * - predictEarnings - A function that predicts a freelancer's potential earnings.
 * - EarningsPredictionInput - The input type for the predictEarnings function.
 * - EarningsPredictionOutput - The return type for the predictEarnings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EarningsPredictionInputSchema = z.object({
  skills: z
    .array(z.string())
    .describe('A list of skills the freelancer possesses.'),
  experienceYears: z
    .number()
    .describe('The number of years of experience the freelancer has.'),
  desiredRate: z
    .number()
    .describe('The desired hourly rate of the freelancer.'),
});
export type EarningsPredictionInput = z.infer<typeof EarningsPredictionInputSchema>;

const EarningsPredictionOutputSchema = z.object({
  predictedEarnings: z
    .number()
    .describe(
      'The predicted annual earnings based on the provided skills, experience, and desired rate.'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the predicted earnings, including demand for skills and market conditions.'
    ),
});
export type EarningsPredictionOutput = z.infer<typeof EarningsPredictionOutputSchema>;

export async function predictEarnings(
  input: EarningsPredictionInput
): Promise<EarningsPredictionOutput> {
  return predictEarningsFlow(input);
}

const predictEarningsPrompt = ai.definePrompt({
  name: 'predictEarningsPrompt',
  input: {schema: EarningsPredictionInputSchema},
  output: {schema: EarningsPredictionOutputSchema},
  prompt: `You are an AI assistant that predicts a freelancer's potential annual earnings on the BaseLance platform.

  Consider the freelancer's skills, years of experience, and desired hourly rate.
  Also take into account the current demand for those skills on the platform, and general market conditions.

  Skills: {{skills}}
  Experience: {{experienceYears}} years
  Desired Rate: {{desiredRate}} USD per hour

  Provide a predicted annual earnings figure and a brief explanation of your reasoning.
  Format the output as a JSON object.  Be concise in your reasoning.
  `,
});

const predictEarningsFlow = ai.defineFlow(
  {
    name: 'predictEarningsFlow',
    inputSchema: EarningsPredictionInputSchema,
    outputSchema: EarningsPredictionOutputSchema,
  },
  async input => {
    const {output} = await predictEarningsPrompt(input);
    return output!;
  }
);
