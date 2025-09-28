'use server';

/**
 * @fileOverview An AI agent for extracting receipt data.
 *
 * - extractReceiptData - A function that handles the receipt data extraction process.
 * - ExtractReceiptDataInput - The input type for the extractReceiptData function.
 * - ExtractReceiptDataOutput - The return type for the extractReceiptData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReceiptItemSchema = z.object({
  name: z.string().describe('The name of the item.'),
  quantity: z.number().optional().describe('The quantity of the item purchased.'),
  price: z.number().describe('The price of a single item.'),
  total: z.number().optional().describe('The total price for the quantity of items purchased.'),
});

const ExtractReceiptDataOutputSchema = z.object({
  merchantName: z.string().describe('The name of the merchant or store.'),
  merchantAddress: z.string().optional().describe('The address of the merchant.'),
  merchantPhone: z.string().optional().describe('The phone number of the merchant.'),
  transactionDate: z.string().describe("The date of the transaction in 'YYYY-MM-DD' format."),
  transactionTime: z.string().optional().describe("The time of the transaction in 'HH:MM:SS' or 'HH:MM AM/PM' format."),
  items: z.array(ReceiptItemSchema).describe('A list of all items purchased, including their name, quantity, price, and total.'),
  currency: z.string().optional().describe('The currency used for the transaction (e.g., USD, EUR).'),
  subtotal: z.number().optional().describe('The subtotal amount before taxes and discounts.'),
  discounts: z.number().optional().describe('The total amount of any discounts applied.'),
  taxAmount: z.number().optional().describe('The total tax amount.'),
  tipAmount: z.number().optional().describe('The tip or gratuity amount.'),
  totalAmount: z.number().describe('The final total amount of the transaction.'),
  paymentMethod: z.string().optional().describe('The method of payment (e.g., Credit Card, Debit Card, Cash).'),
  last4Digits: z.string().optional().describe('The last 4 digits of the card used for payment, if available.'),
  receiptId: z.string().optional().describe('The receipt, transaction, or invoice number.'),
  loyaltyProgram: z.object({
    programName: z.string().optional().describe('The name of the loyalty program.'),
    memberId: z.string().optional().describe('The loyalty member ID or number.'),
    pointsEarned: z.number().optional().describe('The number of points or rewards earned in this transaction.'),
    pointsBalance: z.number().optional().describe('The new total balance of loyalty points.'),
  }).optional().describe('Details related to a loyalty or rewards program.'),
  summary: z.string().optional().describe('A brief, one-sentence summary of the purchase.'),
});

const ExtractReceiptDataInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a receipt, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractReceiptDataInput = z.infer<typeof ExtractReceiptDataInputSchema>;
export type ExtractReceiptDataOutput = z.infer<typeof ExtractReceiptDataOutputSchema>;

export async function extractReceiptData(input: ExtractReceiptDataInput): Promise<ExtractReceiptDataOutput> {
  return extractReceiptDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractReceiptDataPrompt',
  input: {schema: ExtractReceiptDataInputSchema},
  output: {schema: ExtractReceiptDataOutputSchema},
  prompt: `You are an expert in extracting detailed data from receipts. Given an image of a receipt, extract as much information as possible.

- Merchant details: name, address, phone number.
- Transaction details: date (YYYY-MM-DD), time, receipt/transaction ID.
- Line items: Extract each item with its name, quantity, price, and total.
- Financials: subtotal, discounts, tax, tip, and the final total amount.
- Payment info: method (e.g., credit card), last 4 digits of the card if visible.
- Loyalty Program: program name, member ID, points earned, and total points balance if available.
- Summary: A brief, one-sentence summary of the purchase.

Here is the receipt image:

{{media url=photoDataUri}}

Ensure that the extracted information is accurate and complete. Output the information in the specified JSON format. Do not include any other text.
`,
});

const extractReceiptDataFlow = ai.defineFlow(
  {
    name: 'extractReceiptDataFlow',
    inputSchema: ExtractReceiptDataInputSchema,
    outputSchema: ExtractReceiptDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
