'use server';
/**
 * @fileOverview This file defines a Genkit flow for summarizing player statistics.
 *
 * - summarizePlayerStats - A function that takes player statistics as input and returns a summary.
 * - PlayerStatsInput - The input type for the summarizePlayerStats function.
 * - PlayerStatsOutput - The return type for the summarizePlayerStats function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PlayerStatsInputSchema = z.object({
  playerName: z.string().describe('The name of the player.'),
  goals: z.number().describe('The number of goals scored by the player.'),
  assists: z.number().describe('The number of assists made by the player.'),
  gamesPlayed: z.number().describe('The number of games played by the player.'),
  yellowCards: z.number().describe('The number of yellow cards received by the player.'),
  redCards: z.number().describe('The number of red cards received by the player.'),
  shotsPerGame: z.number().describe('The average number of shots per game by the player.'),
  passSuccessRate: z.number().describe('The pass success rate of the player.'),
});
export type PlayerStatsInput = z.infer<typeof PlayerStatsInputSchema>;

const PlayerStatsOutputSchema = z.object({
  summary: z.string().describe('A summary of the player\'s statistics, highlighting their strengths and weaknesses.'),
});
export type PlayerStatsOutput = z.infer<typeof PlayerStatsOutputSchema>;

export async function summarizePlayerStats(input: PlayerStatsInput): Promise<PlayerStatsOutput> {
  return summarizePlayerStatsFlow(input);
}

const summarizePlayerStatsPrompt = ai.definePrompt({
  name: 'summarizePlayerStatsPrompt',
  input: {schema: PlayerStatsInputSchema},
  output: {schema: PlayerStatsOutputSchema},
  prompt: `Summarize the statistics for the player {{playerName}}.

Goals: {{goals}}
Assists: {{assists}}
Games Played: {{gamesPlayed}}
Yellow Cards: {{yellowCards}}
Red Cards: {{redCards}}
Shots per Game: {{shotsPerGame}}
Pass Success Rate: {{passSuccessRate}}%

Highlight their strengths and weaknesses based on these stats.`,
});

const summarizePlayerStatsFlow = ai.defineFlow(
  {
    name: 'summarizePlayerStatsFlow',
    inputSchema: PlayerStatsInputSchema,
    outputSchema: PlayerStatsOutputSchema,
  },
  async input => {
    const {output} = await summarizePlayerStatsPrompt(input);
    return output!;
  }
);
