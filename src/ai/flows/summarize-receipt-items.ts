// Summarize receipt items into a concise format for Google Wallet.

'use server';

/**
 * @fileOverview Summarizes receipt line items for display in a Google Wallet pass.
 *
 * - summarizeReceiptItems - A function that summarizes the receipt items.
 * - SummarizeReceiptItemsInput - The input type for the summarizeReceiptItems function.
 * - SummarizeReceiptItemsOutput - The return type for the summarizeReceiptItems function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeReceiptItemsInputSchema = z.object({
  items: z.array(z.string()).describe('The line items from the receipt.'),
});
export type SummarizeReceiptItemsInput = z.infer<typeof SummarizeReceiptItemsInputSchema>;

const SummarizeReceiptItemsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the receipt line items.'),
});
export type SummarizeReceiptItemsOutput = z.infer<typeof SummarizeReceiptItemsOutputSchema>;

export async function summarizeReceiptItems(input: SummarizeReceiptItemsInput): Promise<SummarizeReceiptItemsOutput> {
  return summarizeReceiptItemsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeReceiptItemsPrompt',
  input: {schema: SummarizeReceiptItemsInputSchema},
  output: {schema: SummarizeReceiptItemsOutputSchema},
  prompt: `You are an AI assistant that summarizes a list of receipt line items into a concise and readable format for a Google Wallet pass.

  The goal is to provide a brief overview of the items purchased. Keep the summary short and easy to understand.

  Receipt Items:
  {{#each items}}
  - {{{this}}}
  {{/each}}
  `,
});

const summarizeReceiptItemsFlow = ai.defineFlow(
  {
    name: 'summarizeReceiptItemsFlow',
    inputSchema: SummarizeReceiptItemsInputSchema,
    outputSchema: SummarizeReceiptItemsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
