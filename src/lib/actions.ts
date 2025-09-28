'use server';

import {
  extractReceiptData as extractReceiptDataFlow,
  type ExtractReceiptDataInput,
  type ExtractReceiptDataOutput,
} from '@/ai/flows/extract-receipt-data';
import {
  summarizeReceiptItems as summarizeReceiptItemsFlow,
  type SummarizeReceiptItemsInput,
} from '@/ai/flows/summarize-receipt-items';
import {
    createWalletPassPayload,
    type CreateWalletPassInput,
} from '@/ai/flows/create-wallet-pass';
import jwt from 'jsonwebtoken';


async function handleFlowError(error: unknown, defaultMessage: string): Promise<{ data: null; error: string; }> {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { data: null, error: `${defaultMessage}. ${errorMessage}` };
}

export async function processReceipt(
  input: ExtractReceiptDataInput
): Promise<{ data: ExtractReceiptDataOutput | null; error: string | null }> {
  try {
    // First, extract all data from the receipt.
    const extractedData = await extractReceiptDataFlow(input);
    
    // If a summary wasn't generated, or if we want to refine it.
    if (!extractedData.summary && extractedData.items.length > 0) {
      const summaryInput: SummarizeReceiptItemsInput = {
        items: extractedData.items.map(item => `${item.quantity || 1} x ${item.name} @ ${item.price}`),
      };
      const summaryResult = await summarizeReceiptItemsFlow(summaryInput);
      extractedData.summary = summaryResult.summary;
    }
    
    return { data: extractedData, error: null };
  } catch (error) {
    return handleFlowError(error, 'Failed to process receipt');
  }
}

export async function createWalletPassLink(
    input: CreateWalletPassInput
): Promise<{ data: { signedJwt: string; } | null; error: string | null; }> {
    try {
        // 1. Get the pass payload from the AI flow.
        const passPayload = await createWalletPassPayload(input);

        // 2. Check for necessary credentials
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_ISSUER_ID) {
            throw new Error("Missing Google Wallet service account credentials in .env file. Please check GOOGLE_ISSUER_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, and GOOGLE_PRIVATE_KEY.");
        }
        
        const credentials = {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        };

        // 3. Construct the full JWT payload with metadata
        const fullPayload = {
            iss: credentials.client_email,
            aud: 'google',
            typ: 'savetoandroidpay',
            iat: Math.floor(Date.now() / 1000),
            origins: [], // The origins check is handled by the Add to Wallet button, so this can be empty.
            payload: passPayload,
        };
        
        // 4. Sign the JWT.
        const signedJwt = jwt.sign(
            fullPayload,
            credentials.private_key,
            {
                algorithm: 'RS256',
            }
        );

        return { data: { signedJwt }, error: null };
    } catch (error) {
        return handleFlowError(error, 'Failed to create Google Wallet pass');
    }
}
