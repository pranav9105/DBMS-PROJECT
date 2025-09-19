'use client';
import { useState } from 'react';
import { Receipt as ReceiptIcon, DollarSign, PieChart } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { SpendingTrendChart } from '@/components/dashboard/spending-trend-chart';
import { CategoryBreakdownChart } from '@/components/dashboard/category-breakdown-chart';
import { RecentReceipts } from '@/components/dashboard/recent-receipts';
import { UploadReceiptDialog } from '@/components/dashboard/upload-receipt-dialog';
import { receipts as initialReceipts, Receipt } from '@/lib/data';

export default function DashboardPage() {
  const [receipts, setReceipts] = useState<Receipt[]>(initialReceipts);

  const handleReceiptAdd = (newReceipt: Receipt) => {
    setReceipts(prevReceipts => [newReceipt, ...prevReceipts]);
  }

  const totalReceipts = receipts.length;
  const totalSpent = receipts.reduce((acc, r) => acc + r.total, 0);

  const categoryCounts: { [key: string]: number } = receipts.reduce((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const biggestCategory = Object.keys(categoryCounts).reduce((a, b) => categoryCounts[a] > categoryCounts[b] ? a : b, 'None');
  const biggestCategoryPercentage = totalReceipts > 0 ? Math.round((categoryCounts[biggestCategory] / totalReceipts) * 100) : 0;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 animate-fade-in-down">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <UploadReceiptDialog onReceiptAdd={handleReceiptAdd} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
          <StatsCard 
            title="Total Receipts" 
            value={totalReceipts.toString()}
            icon={<ReceiptIcon className="h-4 w-4 text-muted-foreground" />}
            description="Your total uploaded receipts"
          />
        </div>
        <div className="animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
          <StatsCard 
            title="Total Spent"
            value={`$${totalSpent.toFixed(2)}`}
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
            description="Across all your receipts"
          />
        </div>
        <div className="animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
          <StatsCard 
            title="Biggest Category"
            value={biggestCategory}
            icon={<PieChart className="h-4 w-4 text-muted-foreground" />}
            description={`${biggestCategoryPercentage}% of total spending`}
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-12 lg:col-span-4 animate-fade-in-down" style={{ animationDelay: '0.4s' }}>
            <SpendingTrendChart />
        </div>
        <div className="col-span-12 lg:col-span-3 animate-fade-in-down" style={{ animationDelay: '0.5s' }}>
            <CategoryBreakdownChart />
        </div>
      </div>
      <div className="animate-fade-in-down" style={{ animationDelay: '0.6s' }}>
        <RecentReceipts receiptList={receipts} setReceiptList={setReceipts} />
      </div>
    </div>
  );
}
