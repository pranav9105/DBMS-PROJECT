'use server';

/**
 * @fileOverview Suggests a likely spending category for a receipt using AI.
 *
 * - suggestReceiptCategory - A function that suggests a category for a receipt.
 * - SuggestReceiptCategoryInput - The input type for the suggestReceiptCategory function.
 * - SuggestReceiptCategoryOutput - The return type for the suggestReceiptCategory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestReceiptCategoryInputSchema = z.object({
  merchantName: z.string().describe('The name of the merchant on the receipt.'),
  totalAmount: z.number().describe('The total amount spent on the receipt.'),
});
export type SuggestReceiptCategoryInput = z.infer<typeof SuggestReceiptCategoryInputSchema>;

const SuggestReceiptCategoryOutputSchema = z.object({
  category: z.string().describe('The suggested spending category for the receipt.'),
});
export type SuggestReceiptCategoryOutput = z.infer<typeof SuggestReceiptCategoryOutputSchema>;

export async function suggestReceiptCategory(input: SuggestReceiptCategoryInput): Promise<SuggestReceiptCategoryOutput> {
  return suggestReceiptCategoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestReceiptCategoryPrompt',
  input: {schema: SuggestReceiptCategoryInputSchema},
  output: {schema: SuggestReceiptCategoryOutputSchema},
  prompt: `You are an AI assistant that suggests the most likely spending category for a receipt, given the merchant name and total amount.

  Suggest a single category that best fits the receipt.

  Merchant Name: {{{merchantName}}}
  Total Amount: {{{totalAmount}}}

  Category:`,
});

const suggestReceiptCategoryFlow = ai.defineFlow(
  {
    name: 'suggestReceiptCategoryFlow',
    inputSchema: SuggestReceiptCategoryInputSchema,
    outputSchema: SuggestReceiptCategoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
