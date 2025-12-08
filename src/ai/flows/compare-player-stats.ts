'use server';

/**
 * @fileOverview An AI agent for comparing two players' statistics.
 *
 * - comparePlayerStats - A function that compares two players' statistics using AI analysis.
 * - ComparePlayerStatsInput - The input type for the comparePlayerStats function.
 * - ComparePlayerStatsOutput - The return type for the comparePlayerStats function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ComparePlayerStatsInputSchema = z.object({
  player1Stats: z.string().describe('The statistics of the first player.'),
  player2Stats: z.string().describe('The statistics of the second player.'),
});
export type ComparePlayerStatsInput = z.infer<typeof ComparePlayerStatsInputSchema>;

const ComparePlayerStatsOutputSchema = z.object({
  comparison: z.string().describe('A detailed comparison of the two players based on their statistics.'),
});
export type ComparePlayerStatsOutput = z.infer<typeof ComparePlayerStatsOutputSchema>;

export async function comparePlayerStats(input: ComparePlayerStatsInput): Promise<ComparePlayerStatsOutput> {
  return comparePlayerStatsFlow(input);
}

const comparePlayerStatsPrompt = ai.definePrompt({
  name: 'comparePlayerStatsPrompt',
  input: {schema: ComparePlayerStatsInputSchema},
  output: {schema: ComparePlayerStatsOutputSchema},
  prompt: `You are an expert football analyst. Compare the following statistics of two players and provide a detailed analysis of their strengths and weaknesses relative to each other.\n\nPlayer 1 Statistics: {{{player1Stats}}}\n\nPlayer 2 Statistics: {{{player2Stats}}}\n\nComparison:`,
});

const comparePlayerStatsFlow = ai.defineFlow(
  {
    name: 'comparePlayerStatsFlow',
    inputSchema: ComparePlayerStatsInputSchema,
    outputSchema: ComparePlayerStatsOutputSchema,
  },
  async input => {
    const {output} = await comparePlayerStatsPrompt(input);
    return output!;
  }
);
