export type Receipt = {
  id: string;
  date: string;
  merchant: string;
  total: number;
  category: string;
};

export const receipts: Receipt[] = [
  { id: '1', date: '2024-07-20', merchant: 'SuperMart', total: 75.4, category: 'Groceries' },
  { id: '2', date: '2024-07-19', merchant: 'The Coffee House', total: 8.5, category: 'Food & Drink' },
  { id: '3', date: '2024-07-18', merchant: 'Gas Station', total: 55.0, category: 'Transport' },
  { id: '4', date: '2024-07-17', merchant: 'Tech World', total: 299.99, category: 'Shopping' },
  { id: '5', date: '2024-07-15', merchant: 'Cinema Plex', total: 32.0, category: 'Entertainment' },
  { id: '6', date: '2024-07-12', merchant: 'City Restaurant', total: 120.8, category: 'Food & Drink' },
  { id: '7', date: '2024-07-10', merchant: 'SuperMart', total: 95.2, category: 'Groceries' },
];

export const spendingTrend = [
  { month: 'Jan', spent: 400 },
  { month: 'Feb', spent: 300 },
  { month: 'Mar', spent: 500 },
  { month: 'Apr', spent: 450 },
  { month: 'May', spent: 600 },
  { month: 'Jun', spent: 550 },
  { month: 'Jul', spent: 700 },
];

export const categoryBreakdown = [
  { category: 'Groceries', value: 40, fill: 'var(--color-groceries)' },
  { category: 'Food & Drink', value: 25, fill: 'var(--color-food)' },
  { category: 'Shopping', value: 15, fill: 'var(--color-shopping)' },
  { category: 'Transport', value: 10, fill: 'var(--color-transport)' },
  { category: 'Entertainment', value: 5, fill: 'var(--color-entertainment)' },
  { category: 'Other', value: 5, fill: 'var(--color-other)' },
];

export const receiptCategories = [
    "Groceries",
    "Food & Drink",
    "Shopping",
    "Transport",
    "Entertainment",
    "Health",
    "Utilities",
    "Rent/Mortgage",
    "Travel",
    "Other"
];
