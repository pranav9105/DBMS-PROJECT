import { Target, TrendingUp, Plus } from 'lucide-react';

export function GoalsCard() {
  const goals = [
    { name: 'Monthly Budget', current: 1250, target: 1500, color: 'emerald' },
    { name: 'Savings Goal', current: 850, target: 1000, color: 'green' },
    { name: 'Food Limit', current: 320, target: 400, color: 'teal' },
  ];

  const getProgressColor = (color: string) => {
    switch (color) {
      case 'emerald': return 'from-emerald-500 to-emerald-600';
      case 'green': return 'from-green-500 to-green-600';
      case 'teal': return 'from-teal-500 to-teal-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg h-fit">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-emerald-600" />
          <h3 className="text-lg font-semibold text-slate-900">Financial Goals</h3>
        </div>
        <button className="p-2 rounded-lg hover:bg-emerald-50 transition-colors">
          <Plus className="h-4 w-4 text-emerald-600" />
        </button>
      </div>
      
      <div className="space-y-6">
        {goals.map((goal, index) => {
          const progress = (goal.current / goal.target) * 100;
          return (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">{goal.name}</span>
                <div className="flex items-center space-x-1 text-emerald-600">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-xs font-medium">{progress.toFixed(0)}%</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className={`h-2 bg-gradient-to-r ${getProgressColor(goal.color)} rounded-full transition-all duration-700 ease-out`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>${goal.current}</span>
                  <span>${goal.target}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:from-emerald-600 hover:to-green-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
        Add New Goal
      </button>
    </div>
  );
}