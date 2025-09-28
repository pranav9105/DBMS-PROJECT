import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-receipt-category.ts';
import '@/ai/flows/extract-receipt-data.ts';
import '@/ai/flows/summarize-receipt-items.ts';
import '@/ai/flows/create-wallet-pass.ts';