'use client';

import { Receipt, DollarSign, PieChart } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { SpendingTrendChart } from '@/components/dashboard/spending-trend-chart';
import { CategoryBreakdownChart } from '@/components/dashboard/category-breakdown-chart';
import { RecentReceipts } from '@/components/dashboard/recent-receipts';
import { UploadReceiptDialog } from '@/components/dashboard/upload-receipt-dialog';

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 animate-fade-in-down">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <UploadReceiptDialog />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
          <StatsCard 
            title="Total Receipts" 
            value="7"
            icon={<Receipt className="h-4 w-4 text-muted-foreground" />}
            description="Your total uploaded receipts"
          />
        </div>
        <div className="animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
          <StatsCard 
            title="Total Spent (July)"
            value="$682.89"
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
            description="Total for the current month"
          />
        </div>
        <div className="animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
          <StatsCard 
            title="Biggest Category"
            value="Groceries"
            icon={<PieChart className="h-4 w-4 text-muted-foreground" />}
            description="40% of total spending"
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
        <RecentReceipts />
      </div>
    </div>
  );
}
