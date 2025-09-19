'use server';

import { suggestReceiptCategory, SuggestReceiptCategoryInput } from '@/ai/flows/suggest-receipt-category';

export async function getCategorySuggestion(input: SuggestReceiptCategoryInput) {
  try {
    const result = await suggestReceiptCategory(input);
    return result.category;
  } catch (error) {
    console.error('Error getting category suggestion:', error);
    return null;
  }
}
