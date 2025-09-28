import { TrendingUp, Calendar } from 'lucide-react';

export function SpendingTrendChart() {
  // Mock data for the chart
  const chartData = [
    { month: 'Jan', spent: 1200 },
    { month: 'Feb', spent: 1400 },
    { month: 'Mar', spent: 1100 },
    { month: 'Apr', spent: 1600 },
    { month: 'May', spent: 1350 },
    { month: 'Jun', spent: 1750 },
    { month: 'Jul', spent: 1550 },
  ];

  const maxSpent = Math.max(...chartData.map(d => d.spent));

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-emerald-600" />
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Spending Trend</h3>
            <p className="text-sm text-slate-600">Your spending over the last 7 months</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-emerald-600">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-medium">+12% vs last period</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {chartData.map((data, index) => {
          const percentage = (data.spent / maxSpent) * 100;
          return (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-8 text-xs font-medium text-slate-600">{data.month}</div>
              <div className="flex-1 bg-slate-100 rounded-full h-3 relative overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-700 ease-out"
                  style={{ 
                    width: `${percentage}%`,
                    animationDelay: `${index * 100}ms`
                  }}
                ></div>
              </div>
              <div className="w-16 text-right text-sm font-medium text-slate-700">
                ${data.spent}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-900">Average Monthly Spending</p>
            <p className="text-xs text-slate-600">Based on last 7 months</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-emerald-700">
              ${Math.round(chartData.reduce((acc, d) => acc + d.spent, 0) / chartData.length)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}