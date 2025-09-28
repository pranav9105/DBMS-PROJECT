"use client"
import { Upload, Scan, CreditCard, Target, Zap, Camera } from 'lucide-react';

export function QuickActions() {
  const actions = [
    { icon: Upload, label: 'Upload Receipt', color: 'from-emerald-500 to-emerald-600', bgColor: 'from-emerald-50 to-emerald-100' },
    { icon: Scan, label: 'Scan Document', color: 'from-green-500 to-green-600', bgColor: 'from-green-50 to-green-100' },
    { icon: Camera, label: 'Take Photo', color: 'from-teal-500 to-teal-600', bgColor: 'from-teal-50 to-teal-100' },
    { icon: Target, label: 'Set Goal', color: 'from-lime-500 to-lime-600', bgColor: 'from-lime-50 to-lime-100' },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-2 mb-4">
        <Zap className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className="group relative p-4 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${action.bgColor} rounded-lg opacity-50 group-hover:opacity-100 transition-opacity`}></div>
            <div className="relative z-10 flex flex-col items-center space-y-2">
              <div className={`p-2 bg-gradient-to-br ${action.color} rounded-lg text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
                <action.icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-slate-700">{action.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}