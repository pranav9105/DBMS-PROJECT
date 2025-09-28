export interface Receipt {
  id: string;
  merchant: string;
  date: string;
  total: number;
  category: string;
  items?: string[];
}

export const receipts: Receipt[] = [
  {
    id: '1',
    merchant: 'Whole Foods Market',
    date: '2024-01-15',
    total: 87.45,
    category: 'Groceries',
    items: ['Organic Bananas', 'Almond Milk', 'Quinoa', 'Spinach']
  },
  {
    id: '2',
    merchant: 'Starbucks Coffee',
    date: '2024-01-14',
    total: 12.50,
    category: 'Food',
    items: ['Grande Latte', 'Blueberry Muffin']
  },
  {
    id: '3',
    merchant: 'Target',
    date: '2024-01-13',
    total: 156.78,
    category: 'Shopping',
    items: ['Laundry Detergent', 'Shampoo', 'Kitchen Towels', 'Phone Charger']
  },
  {
    id: '4',
    merchant: 'Uber',
    date: '2024-01-12',
    total: 23.45,
    category: 'Transport',
    items: ['Ride to Downtown']
  },
  {
    id: '5',
    merchant: 'AMC Theatres',
    date: '2024-01-11',
    total: 34.50,
    category: 'Entertainment',
    items: ['Movie Tickets x2', 'Popcorn']
  },
  {
    id: '6',
    merchant: 'Trader Joes',
    date: '2024-01-10',
    total: 67.23,
    category: 'Groceries',
    items: ['Frozen Berries', 'Pasta', 'Olive Oil', 'Wine']
  },
  {
    id: '7',
    merchant: 'McDonald\'s',
    date: '2024-01-09',
    total: 15.67,
    category: 'Food',
    items: ['Big Mac Meal', 'Apple Pie']
  },
  {
    id: '8',
    merchant: 'Amazon',
    date: '2024-01-08',
    total: 89.99,
    category: 'Shopping',
    items: ['Wireless Headphones', 'Phone Case']
  },
  {
    id: '9',
    merchant: 'Fresh Market',
    date: '2024-01-07',
    total: 45.30,
    category: 'Groceries',
    items: ['Fresh Vegetables', 'Chicken Breast', 'Rice']
  },
  {
    id: '10',
    merchant: 'Netflix',
    date: '2024-01-06',
    total: 15.99,
    category: 'Entertainment',
    items: ['Monthly Subscription']
  },
  {
    id: '11',
    merchant: 'Shell Gas Station',
    date: '2024-01-05',
    total: 52.75,
    category: 'Transport',
    items: ['Gasoline', 'Car Wash']
  },
  {
    id: '12',
    merchant: 'Best Buy',
    date: '2024-01-04',
    total: 299.99,
    category: 'Shopping',
    items: ['Bluetooth Speaker', 'USB Cable']
  }
];

export const spendingTrend = [
  { month: 'July', spent: 1420 },
  { month: 'August', spent: 1650 },
  { month: 'September', spent: 1200 },
  { month: 'October', spent: 1800 },
  { month: 'November', spent: 1550 },
  { month: 'December', spent: 2100 },
  { month: 'January', spent: 1750 },
];

export const categoryBreakdown = [
  { category: 'groceries', value: 450, fill: '#10b981' },
  { category: 'food', value: 280, fill: '#22c55e' },
  { category: 'shopping', value: 320, fill: '#14b8a6' },
  { category: 'transport', value: 180, fill: '#06b6d4' },
  { category: 'entertainment', value: 120, fill: '#84cc16' },
  { category: 'other', value: 150, fill: '#6b7280' },
];