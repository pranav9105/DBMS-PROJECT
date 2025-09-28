"use client"

import { MoreHorizontal, Trash2, Eye, Calendar, DollarSign } from 'lucide-react';
import { Receipt } from '../../lib/data';

export function RecentReceipts({ 
  receiptList, 
  setReceiptList 
}: { 
  receiptList: Receipt[], 
  setReceiptList: React.Dispatch<React.SetStateAction<Receipt[]>> 
}) {
  const handleDelete = (id: string) => {
    setReceiptList(receiptList.filter(receipt => receipt.id !== id));
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'groceries': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'food': return 'bg-green-100 text-green-700 border-green-200';
      case 'shopping': return 'bg-teal-100 text-teal-700 border-teal-200';
      case 'transport': return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      case 'entertainment': return 'bg-lime-100 text-lime-700 border-lime-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-slate-200/50 bg-gradient-to-r from-emerald-50 to-green-50">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-emerald-600" />
          <h3 className="text-lg font-semibold text-slate-900">Recent Receipts</h3>
        </div>
        <p className="text-sm text-slate-600 mt-1">Your latest receipt uploads and transactions</p>
      </div>
      
      <div className="divide-y divide-slate-100">
        {receiptList.slice(0, 5).map((receipt, index) => (
          <div key={receipt.id} className="p-4 hover:bg-emerald-50/30 transition-colors duration-200 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-slate-900">{receipt.merchant}</div>
                  <div className="text-sm text-slate-500">
                    {new Date(receipt.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(receipt.category)}`}>
                  {receipt.category}
                </span>
                <div className="text-right">
                  <div className="font-semibold text-slate-900">${receipt.total.toFixed(2)}</div>
                </div>
                
                <div className="relative">
                  <button className="p-2 rounded-lg hover:bg-emerald-100 transition-colors opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 border-t border-slate-200/50">
        <button className="w-full text-center text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
          View All Receipts →
        </button>
      </div>
    </div>
  );
}