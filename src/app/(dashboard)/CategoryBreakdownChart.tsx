import { PieChart } from 'lucide-react';

export function CategoryBreakdownChart() {
  const categories = [
    { name: 'Groceries', value: 35, color: 'from-emerald-400 to-emerald-600', amount: '$525' },
    { name: 'Food & Drink', value: 25, color: 'from-green-400 to-green-600', amount: '$375' },
    { name: 'Shopping', value: 20, color: 'from-teal-400 to-teal-600', amount: '$300' },
    { name: 'Transport', value: 15, color: 'from-cyan-400 to-cyan-600', amount: '$225' },
    { name: 'Entertainment', value: 5, color: 'from-lime-400 to-lime-600', amount: '$75' },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-2 mb-6">
        <PieChart className="h-5 w-5 text-emerald-600" />
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Category Breakdown</h3>
          <p className="text-sm text-slate-600">Spending by category this month</p>
        </div>
      </div>
      
      {/* Pie Chart Visualization */}
      <div className="relative w-48 h-48 mx-auto mb-6">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-100 to-slate-200 shadow-inner relative overflow-hidden">
          {/* Simplified pie segments using conic-gradient */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-emerald-400 via-green-400 via-teal-400 via-cyan-400 to-lime-400 opacity-80"></div>
          <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">$1,500</div>
              <div className="text-xs text-slate-500">Total Spent</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="space-y-3">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`}></div>
              <span className="text-sm font-medium text-slate-700">{category.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-slate-900">{category.amount}</span>
              <span className="text-xs text-slate-500">{category.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}