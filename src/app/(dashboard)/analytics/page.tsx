import { BarChart3, TrendingUp, PieChart, Calendar } from 'lucide-react';
import { SpendingTrendChart } from '../SpendingTrendChart';
import { CategoryBreakdownChart } from '../CategoryBreakdownChart';
export default function AnalyticsPage() {
  const insights = [
    {
      title: "Top Spending Category",
      value: "Groceries",
      change: "+15%",
      trend: "up",
      description: "Your highest expense category this month"
    },
    {
      title: "Average Daily Spend",
      value: "$47.50",
      change: "-8%",
      trend: "down",
      description: "Daily spending average for this month"
    },
    {
      title: "Monthly Budget Usage",
      value: "78%",
      change: "+5%",
      trend: "up",
      description: "Of your $2,000 monthly budget"
    },
    {
      title: "Savings Rate",
      value: "22%",
      change: "+12%",
      trend: "up",
      description: "Percentage of income saved"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-green-50/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-green-200/20 rounded-full blur-3xl -translate-y-48 translate-x-48 animate-pulse"></div>
      
      <div className="relative z-10 flex-1 space-y-8 p-4 md:p-8 pt-6">
        {/* Header */}
        <div className="animate-fade-in-down">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent mb-2">
            Analytics 📊
          </h1>
          <p className="text-slate-600 text-lg">Deep insights into your spending patterns and financial health.</p>
        </div>

        {/* Insights Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {insights.map((insight, index) => (
            <div key={index} className="group bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-down" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-emerald-600" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  insight.trend === 'up' ? 'text-emerald-600' : 'text-red-500'
                }`}>
                  <TrendingUp className={`h-3 w-3 ${insight.trend === 'down' ? 'rotate-180' : ''}`} />
                  <span>{insight.change}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">{insight.title}</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-emerald-900 bg-clip-text text-transparent">
                  {insight.value}
                </p>
                <p className="text-xs text-slate-500">{insight.description}</p>
              </div>
            </div>
          ))}
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

        {/* Monthly Comparison */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg animate-fade-in-down" style={{ animationDelay: '0.7s' }}>
          <div className="flex items-center space-x-2 mb-6">
            <Calendar className="h-5 w-5 text-emerald-600" />
            <h3 className="text-lg font-semibold text-slate-900">Monthly Comparison</h3>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            {['Last Month', 'This Month', 'Projected'].map((period, index) => {
              const values = ['$1,456', '$1,234', '$1,389'];
              const changes = ['-5%', '-15%', '+12%'];
              return (
                <div key={period} className="text-center p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-green-50">
                  <p className="text-sm font-medium text-slate-600 mb-2">{period}</p>
                  <p className="text-2xl font-bold text-slate-900 mb-1">{values[index]}</p>
                  <p className={`text-sm font-medium ${
                    changes[index].startsWith('+') ? 'text-emerald-600' : 'text-red-500'
                  }`}>
                    {changes[index]} vs previous
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}