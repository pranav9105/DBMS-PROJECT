"use client";
import { useState } from 'react';
import { Receipt as ReceiptIcon, DollarSign, TrendingUp, Calendar, Plus, Sparkles } from 'lucide-react';
import { StatsCard } from '../StatsCard';
import { SpendingTrendChart } from '../SpendingTrendChart';
import { CategoryBreakdownChart } from '../CategoryBreakdownChart';
import { RecentReceipts } from '../RecentReceipts';
import { receipts as initialReceipts, Receipt } from '../data';
import { GoalsCard } from '../GoalsCard';
import { QuickActions } from '../QuickActions';
import Link from 'next/link';

export default function DashboardPage() {
  const [receipts, setReceipts] = useState<Receipt[]>(initialReceipts);

  const handleReceiptAdd = (newReceipt: Receipt) => {
    setReceipts(prevReceipts => [newReceipt, ...prevReceipts]);
  };

  const handleUploadClick = () => {
    console.log('Upload receipt clicked');
  };

  const totalReceipts = receipts.length;
  const totalSpent = receipts.reduce((acc, r) => acc + r.total, 0);
  const thisMonthSpent = receipts
    .filter(r => new Date(r.date).getMonth() === new Date().getMonth())
    .reduce((acc, r) => acc + r.total, 0);
  const avgPerReceipt = totalReceipts > 0 ? totalSpent / totalReceipts : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-green-50/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-green-200/20 rounded-full blur-3xl -translate-y-48 translate-x-48 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-200/20 to-emerald-200/20 rounded-full blur-3xl translate-y-48 -translate-x-48 animate-pulse"></div>
      
      <div className="relative z-10 flex-1 space-y-8 p-4 md:p-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in-down">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent">
              Welcome back! 👋
            </h1>
            <p className="text-slate-600 text-lg">Here's what's happening with your finances today.</p>
          </div>
         <div className="flex items-center space-x-3">
  <Link
    href="/upload-receipt"
    className="group relative inline-flex items-center justify-center rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl hover:scale-105 h-12 px-6 py-3"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-green-400 opacity-0 group-hover:opacity-20 transition-opacity rounded-xl"></div>
    <Plus className="mr-2 h-5 w-5" />
    <span>Upload Receipt</span>
    <Sparkles className="ml-2 h-4 w-4 opacity-70" />
  </Link>
</div>
        </div>

        {/* Quick Actions */}
        <div className="animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
          <QuickActions />
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
            <StatsCard 
              title="Total Receipts" 
              value={totalReceipts.toString()}
              icon={<ReceiptIcon className="h-5 w-5 text-emerald-600" />}
              description="Your total uploaded receipts"
              trend="+12% from last month"
              trendUp={true}
            />
          </div>
          <div className="animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
            <StatsCard 
              title="Total Spent"
              value={`$${totalSpent.toFixed(2)}`}
              icon={<DollarSign className="h-5 w-5 text-green-600" />}
              description="Across all your receipts"
              trend="+5% from last month"
              trendUp={true}
            />
          </div>
          <div className="animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
            <StatsCard 
              title="This Month"
              value={`$${thisMonthSpent.toFixed(2)}`}
              icon={<Calendar className="h-5 w-5 text-emerald-600" />}
              description="Current month spending"
              trend="-8% from last month"
              trendUp={false}
            />
          </div>
          <div className="animate-fade-in-down" style={{ animationDelay: '0.4s' }}>
            <StatsCard 
              title="Avg per Receipt"
              value={`$${avgPerReceipt.toFixed(2)}`}
              icon={<TrendingUp className="h-5 w-5 text-green-600" />}
              description="Average spending per receipt"
              trend="+3% from last month"
              trendUp={true}
            />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 animate-fade-in-down" style={{ animationDelay: '0.5s' }}>
            <SpendingTrendChart />
          </div>
          <div className="animate-fade-in-down" style={{ animationDelay: '0.6s' }}>
            <CategoryBreakdownChart />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 animate-fade-in-down" style={{ animationDelay: '0.7s' }}>
            <RecentReceipts receiptList={receipts} setReceiptList={setReceipts} />
          </div>
          <div className="animate-fade-in-down" style={{ animationDelay: '0.8s' }}>
            <GoalsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
