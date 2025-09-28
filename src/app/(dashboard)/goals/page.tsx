import { Target, Plus, TrendingUp, Calendar, DollarSign } from 'lucide-react';

export default function GoalsPage() {
  const goals = [
    { 
      id: 1,
      name: 'Emergency Fund', 
      current: 3500, 
      target: 5000, 
      color: 'emerald',
      deadline: '2024-06-30',
      category: 'Savings'
    },
    { 
      id: 2,
      name: 'Monthly Budget', 
      current: 1250, 
      target: 1500, 
      color: 'green',
      deadline: '2024-01-31',
      category: 'Budget'
    },
    { 
      id: 3,
      name: 'Vacation Fund', 
      current: 850, 
      target: 2000, 
      color: 'teal',
      deadline: '2024-07-15',
      category: 'Savings'
    },
    { 
      id: 4,
      name: 'Food Budget', 
      current: 320, 
      target: 400, 
      color: 'lime',
      deadline: '2024-01-31',
      category: 'Budget'
    },
  ];

  const getProgressColor = (color: string) => {
    switch (color) {
      case 'emerald': return 'from-emerald-500 to-emerald-600';
      case 'green': return 'from-green-500 to-green-600';
      case 'teal': return 'from-teal-500 to-teal-600';
      case 'lime': return 'from-lime-500 to-lime-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const getBgColor = (color: string) => {
    switch (color) {
      case 'emerald': return 'from-emerald-100 to-emerald-200';
      case 'green': return 'from-green-100 to-green-200';
      case 'teal': return 'from-teal-100 to-teal-200';
      case 'lime': return 'from-lime-100 to-lime-200';
      default: return 'from-slate-100 to-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-green-50/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-green-200/20 rounded-full blur-3xl -translate-y-48 translate-x-48 animate-pulse"></div>
      
      <div className="relative z-10 flex-1 space-y-8 p-4 md:p-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in-down">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent">
              Financial Goals 🎯
            </h1>
            <p className="text-slate-600 text-lg">Track your progress towards financial milestones.</p>
          </div>
          <button className="group relative inline-flex items-center justify-center rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl hover:scale-105 h-12 px-6 py-3 transition-all duration-300">
            <Plus className="mr-2 h-5 w-5" />
            Add New Goal
          </button>
        </div>

        {/* Goals Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal, index) => {
            const progress = (goal.current / goal.target) * 100;
            const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <div key={goal.id} className="group bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-down" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-br ${getBgColor(goal.color)} rounded-xl`}>
                    <Target className="h-6 w-6 text-emerald-600" />
                  </div>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                    {goal.category}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg mb-1">{goal.name}</h3>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">
                        {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-700">Progress</span>
                      <div className="flex items-center space-x-1 text-emerald-600">
                        <TrendingUp className="h-3 w-3" />
                        <span className="text-sm font-medium">{progress.toFixed(0)}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div 
                        className={`h-3 bg-gradient-to-r ${getProgressColor(goal.color)} rounded-full transition-all duration-700 ease-out`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>${goal.current.toLocaleString()}</span>
                      <span>${goal.target.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Remaining</span>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4 text-slate-500" />
                        <span className="font-semibold text-slate-900">
                          ${(goal.target - goal.current).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Goal Summary */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg animate-fade-in-down" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Goal Summary</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-green-50">
              <p className="text-sm font-medium text-slate-600 mb-2">Total Goals</p>
              <p className="text-2xl font-bold text-slate-900">{goals.length}</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-green-50">
              <p className="text-sm font-medium text-slate-600 mb-2">Completed</p>
              <p className="text-2xl font-bold text-emerald-600">
                {goals.filter(g => g.current >= g.target).length}
              </p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-green-50">
              <p className="text-sm font-medium text-slate-600 mb-2">Total Progress</p>
              <p className="text-2xl font-bold text-green-600">
                {Math.round(goals.reduce((acc, g) => acc + (g.current / g.target), 0) / goals.length * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}