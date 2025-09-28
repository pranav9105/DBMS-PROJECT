'use server';
/**
 * @fileOverview Creates a Google Wallet pass object from receipt data.
 *
 * This file defines the AI-powered flow for generating a JSON object that represents
 * the payload for a Google Wallet pass. This object can then be signed into a JWT
 * to create a pass that users can add to their Google Wallet.
 *
 * - createWalletPassPayload - A function that handles the wallet pass payload creation.
 * - CreateWalletPassInput - The input type for the createWalletPassPayload function.
 * - WalletPassPayload - The return type for the createWalletPassPayload function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {v4 as uuidv4} from 'uuid';

// Re-defining the schema here to avoid circular dependencies
const ReceiptItemSchema = z.object({
  name: z.string().describe('The name of the item.'),
  quantity: z.number().optional().describe('The quantity of the item purchased.'),
  price: z.number().describe('The price of a single item.'),
  total: z.number().optional().describe('The total price for the quantity of items purchased.'),
});

const CreateWalletPassInputSchema = z.object({
  merchantName: z.string(),
  transactionDate: z.string(),
  totalAmount: z.number(),
  currency: z.string().optional(),
  items: z.array(ReceiptItemSchema),
  summary: z.string().optional(),
  receiptId: z.string().optional(),
});
export type CreateWalletPassInput = z.infer<typeof CreateWalletPassInputSchema>;

const WalletPassPayloadSchema = z.object({
    genericObjects: z.array(z.object({
      id: z.string().describe("A unique ID for the object, in the format '<ISSUER_ID>.<UUID_OR_RECEIPT_ID>'."),
      classId: z.string().describe("The class ID for the pass, in the format '<ISSUER_ID>.receipt-class'."),
      logo: z.object({
        sourceUri: z.object({
          uri: z.string().url().describe('URL of the merchant logo.')
        })
      }),
      cardTitle: z.object({
        defaultValue: z.object({
          language: z.string(),
          value: z.string().describe('The title of the pass, usually the merchant name.')
        })
      }),
      subheader: z.object({
        defaultValue: z.object({
          language: z.string(),
          value: z.string().describe('Subheader, e.g., "Receipt".')
        })
      }),
      header: z.object({
        defaultValue: z.object({
          language: z.string(),
          value: z.string().describe('Header, typically the price.')
        })
      }),
      textModulesData: z.array(z.object({
        header: z.string(),
        body: z.string(),
        id: z.string(),
      })).optional(),
      linksModuleData: z.object({
        uris: z.array(z.object({
          uri: z.string().url(),
          description: z.string(),
          id: z.string(),
        }))
      }).optional(),
    }))
});

export type WalletPassPayload = z.infer<typeof WalletPassPayloadSchema>;

export async function createWalletPassPayload(input: CreateWalletPassInput): Promise<WalletPassPayload> {
  return createWalletPassPayloadFlow(input);
}

const prompt = ai.definePrompt({
    name: 'createWalletPassPayloadPrompt',
    input: {schema: CreateWalletPassInputSchema},
    output: {schema: WalletPassPayloadSchema},
    prompt: `You are an AI assistant that creates the JSON payload for a Google Wallet pass based on receipt data.

    **Instructions:**
    1.  **Issuer & Class ID**: Use placeholder values for the issuer ('<ISSUER_ID>'). The Class ID must be '<ISSUER_ID>.receipt-class'.
    2.  **Unique Object ID**: The object ID must be unique. Combine the issuer ID with a unique identifier. Use the provided receiptId if available, otherwise generate a UUID. The format must be '<ISSUER_ID>.<UUID_OR_RECEIPT_ID>'.
    3.  **Logo**: Use a placeholder logo URL: 'https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/pass_google_logo.jpg'.
    4.  **Card Title**: Use the merchant name.
    5.  **Subheader**: Use the word "Receipt".
    6.  **Header**: Format the total amount with its currency code (e.g., "$25.50 USD").
    7.  **Text Modules**:
        *   Create a module with header "Transaction Details" and body including the date and receipt ID.
        *   Create a module with header "Order Summary" and body containing the summary of items.
    
    **IMPORTANT**: You must only generate the 'genericObjects' array and its contents. Do not wrap it in a 'payload' object or include any top-level JWT fields like 'iss', 'aud', 'typ', etc.

    **Receipt Data:**
    - Merchant: {{{merchantName}}}
    - Date: {{{transactionDate}}}
    - Total: {{{totalAmount}}} {{{currency}}}
    - Receipt ID: {{{receiptId}}}
    - Summary: {{{summary}}}
    - Items:
    {{#each items}}
      - {{{this.name}}} (Qty: {{{this.quantity}}}, Price: {{{this.price}}})
    {{/each}}
    `,
    config: {
        temperature: 0.1,
    },
});


const createWalletPassPayloadFlow = ai.defineFlow(
  {
    name: 'createWalletPassPayloadFlow',
    inputSchema: CreateWalletPassInputSchema,
    outputSchema: WalletPassPayloadSchema,
  },
  async input => {
    // Augment input with a unique ID if one isn't provided.
    const augmentedInput = {
        ...input,
        receiptId: input.receiptId || uuidv4(),
    };
    
    const {output} = await prompt(augmentedInput);

    // The model might use placeholders; replace them with environment variables if available.
    // In a real app, these would come from a secure source.
    let payloadJson = JSON.stringify(output);
    payloadJson = payloadJson.replace(/<ISSUER_ID>/g, process.env.GOOGLE_ISSUER_ID || 'issuer-id-12345');
    
    return JSON.parse(payloadJson);
  }
);
