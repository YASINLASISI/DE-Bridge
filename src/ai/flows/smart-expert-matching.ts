'use server';

/**
 * @fileOverview An AI agent that suggests the top 3-5 experts based on seeker criteria.
 *
 * - matchExperts - A function that handles the expert matching process.
 * - MatchExpertsInput - The input type for the matchExperts function.
 * - MatchExpertsOutput - The return type for the matchExperts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchExpertsInputSchema = z.object({
  seekerNeeds: z.string().describe('The seeker’s needs or condition.'),
  fieldOfStudy: z.string().describe('The seeker’s field of study, if applicable.'),
  expertAvailability: z
    .string()
    .describe('The seeker’s preferred expert availability in the next 7 days.'),
  priceCompatibility: z.string().describe('The seeker’s price range.'),
  languagePreference: z.string().describe('The seeker’s preferred language.'),
});
export type MatchExpertsInput = z.infer<typeof MatchExpertsInputSchema>;

const MatchExpertsOutputSchema = z.object({
  expertSuggestions: z
    .array(z.string())
    .describe('An array of expert IDs that best match the seeker’s criteria.'),
});
export type MatchExpertsOutput = z.infer<typeof MatchExpertsOutputSchema>;

export async function matchExperts(input: MatchExpertsInput): Promise<MatchExpertsOutput> {
  return matchExpertsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchExpertsPrompt',
  input: {schema: MatchExpertsInputSchema},
  output: {schema: MatchExpertsOutputSchema},
  prompt: `You are an AI assistant designed to suggest the best experts for a seeker based on their needs.

  Given the following information about the seeker, provide a list of 3-5 expert IDs that would be a good match:

  Seeker Needs: {{{seekerNeeds}}}
  Field of Study: {{{fieldOfStudy}}}
  Expert Availability: {{{expertAvailability}}}
  Price Compatibility: {{{priceCompatibility}}}

  Language Preference: {{{languagePreference}}}

  Return ONLY a JSON array of expert IDs.
  `,
});

const matchExpertsFlow = ai.defineFlow(
  {
    name: 'matchExpertsFlow',
    inputSchema: MatchExpertsInputSchema,
    outputSchema: MatchExpertsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
