import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
  trend?: string;
  trendUp?: boolean;
}

export function StatsCard({ title, value, icon, description, trend, trendUp }: StatsCardProps) {
  return (
    <div className="group relative bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-50/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg">
            {icon}
          </div>
          {trend && (
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              trendUp ? 'text-emerald-600' : 'text-red-500'
            }`}>
              {trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span>{trend}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-emerald-900 bg-clip-text text-transparent">
            {value}
          </p>
          {description && (
            <p className="text-xs text-slate-500">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}